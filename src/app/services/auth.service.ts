import {Injectable} from '@angular/core';
import Auth0Lock from 'auth0-lock';
import {CONFIG} from "../consts/config";

@Injectable()
export class AuthService {

  private lock;
  public profile: Object = {};
  public isAuthenticated: boolean = false;

  /**
   * Init Auth0 Lock widget and listen for authentication event.
   * When user authenticates, fetch his profile and set it, alongside tokens in the local storage.
   */
  constructor() {
    // Initiating our Auth0Lock
    this.lock = new Auth0Lock(
      CONFIG.AUTH.CLIENT_ID,
      CONFIG.AUTH.DOMAIN, {
        autoclose: true,
        closable: true,
        rememberLastLogin: true,
        language: 'en',
        theme: {
          logo: CONFIG.ASSETS.LOGO,
          primaryColor: CONFIG.THEME.COLOR1
        },
        auth: {
          sso: false,
          redirect: false,
          responseType: 'token id_token',
          params: {
            scope: 'openid email'
          }
        }
      }
    );

    // Listening for the authenticated event
    this.lock.on('authenticated', authResult => {
      // Use the token in authResult to getUserInfo() and save it to localStorage
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          // Handle error
          return;
        }
        localStorage.setItem('accessToken', authResult.accessToken);
        localStorage.setItem('idToken', authResult.idToken);
        localStorage.setItem('profile', JSON.stringify(profile));
        window.location.reload();
      });
    });

    // On page load, set the isAuthenticated variable
    this.isAuthenticated = !!localStorage.getItem('accessToken');
    // Set the profile from local storage
    this.profile = JSON.parse(localStorage.getItem('profile'));
    console.log(this.profile);
  }

  /**
   * Show the Lock widget with the Login tab selected
   */
  public doLogIn(): void {
    this.lock.show({initialScreen: 'login'});
  }

  /**
   * Show the Lock widget with the Signup tab selected
   */
  public doSignUp(): void {
    this.lock.show({initialScreen: 'signUp'});
  }

  /**
   * Clear local storage of any auth data and redirect user to homepage
   */
  public doLogOut(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('idToken');
    localStorage.removeItem('profile');
    this.lock.logout({returnTo: window.location.origin});
  }
}

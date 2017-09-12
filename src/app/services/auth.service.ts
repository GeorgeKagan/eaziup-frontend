import {Injectable} from '@angular/core';
import Auth0Lock from 'auth0-lock';
import {CONFIG} from '../consts/config';

@Injectable()
export class AuthService {

  private lock;
  private _isAuthenticated: boolean = false;
  private _accType: string = CONFIG.UNKNOWN;
  private _profile: any = {};

  /**
   * Init Auth0 Lock widget and listen for authentication event.
   * When user authenticates, fetch his profile and set it, alongside tokens in the local storage.
   */
  constructor() {
    let expiresAt = JSON.parse(localStorage.getItem('expiresAt'));

    // Initiating our Auth0Lock
    this.lock = new Auth0Lock(
      CONFIG.AUTH.CLIENT_ID,
      CONFIG.AUTH.DOMAIN, {
        avatar: null,
        autoclose: true,
        closable: true,
        rememberLastLogin: false,
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
        },
        additionalSignUpFields: [{
          type: 'select',
          name: 'accountType',
          placeholder: 'Choose account type',
          options: [
            {value: CONFIG.STUDENT, label: 'Student'},
            {value: CONFIG.ENTREPRENEUR, label: 'Entrepreneur'}
          ]
        }]
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
        localStorage.setItem('expiresAt', authResult.expiresIn ? (authResult.expiresIn * 1000 + new Date().getTime()) + '' : '0');
        window.location.reload();
      });
    });

    // On page load, set the isAuthenticated variable
    let isNotExpired = expiresAt !== null && new Date().getTime() < expiresAt;
    this._isAuthenticated = !!localStorage.getItem('accessToken') && (isNotExpired || expiresAt === 0);
    this._profile = JSON.parse(localStorage.getItem('profile'));
    this._accType = (this._profile && this._profile.user_metadata.account_type) || this._accType;
    console.info(`%cAccount type: ${this._accType}`, 'color: green; font-weight: bold;');
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

  public get isAuthenticated() {
    return this._isAuthenticated;
  }

  public get isAccTypeStudent() {
    return this._isAuthenticated && this._accType === CONFIG.STUDENT;
  }

  public get isAccTypeEntrepreneur() {
    return this._isAuthenticated && this._accType === CONFIG.ENTREPRENEUR;
  }

  public get profile() {
    return this._profile;
  }
}

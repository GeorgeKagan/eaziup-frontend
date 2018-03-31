import { Injectable } from '@angular/core';
import Auth0Lock from 'auth0-lock';
import * as auth0 from 'auth0-js';
import { CONFIG } from '../consts/config';

@Injectable()
export class AuthService {

    private lock;
    private readonly _isAuthenticated: boolean = false;
    private readonly _accType: string = CONFIG.UNKNOWN;
    private readonly _profile: any = {};

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
        this.lock.on('authenticated', (authResult) => {
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
        this._accType = (this._profile && this._profile.user_metadata && this._profile.user_metadata.account_type) || this._accType;
        console.info(`%cAccount type: ${this._accType}`, 'color: green; font-weight: bold;');
    }

    /**
     * Show the Lock widget with the Login tab selected
     */
    public doLogIn(): void {
        this.lock.show({
            initialScreen: 'login', allowSignUp: false, languageDictionary: {
                loginWithLabel: 'Log in with %s'
            }
        });
    }

    /**
     * Show the Lock widget with the Signup tab selected
     */
    public doSignUp(): void {
        this.lock.show({
            initialScreen: 'signUp', allowSignUp: false, languageDictionary: {
                loginWithLabel: 'Sign up with %s'
            }
        });
    }

    /**
     * Clear local storage of any auth data and redirect user to homepage
     */
    public doLogOut(): void {
        localStorage.clear();
        this.lock.logout({returnTo: window.location.origin});
    }

    /**
     * Update user custom data
     * @param userMetadata
     * @returns {Promise<any>}
     */
    public updateUserMetadata(userMetadata: any): Promise<any> {
        let auth0Manage = new auth0.Management({
            domain: CONFIG.AUTH.DOMAIN,
            token: localStorage.getItem('idToken')
        });
        return new Promise((resolve) => {
            auth0Manage.getUser(this._profile.user_id, (nothing, data) => {
                // Merge existing data with new
                userMetadata = Object.assign(data.user_metadata || {}, userMetadata);
                auth0Manage.patchUserMetadata(this._profile.user_id, userMetadata, (nothing2, data2) => {
                    localStorage.setItem('profile', JSON.stringify(data2));
                    resolve();
                });
            });
        });
    }

    public get isAuthenticated() {
        return this._isAuthenticated;
    }

    public get isAccTypeUnknown() {
        return this._isAuthenticated && this._accType === CONFIG.UNKNOWN;
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

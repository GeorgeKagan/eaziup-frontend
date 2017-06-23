import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule, ErrorHandler} from '@angular/core';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

// Conditional modules
if (IS_DEV) {
  require('mimic');
}

// Third party modules
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {RestangularModule} from 'ngx-restangular';

// Platform and Environment providers/directives/pipes
import {ENV_PROVIDERS} from './environment';
import {ROUTES} from './app.routes';
import {AppComponent} from './app.component';
import {APP_RESOLVER_PROVIDERS} from './app.resolver';
import {MyErrorHandler} from './my-error-handler';

// States
import {HomeComponent} from './states/home';
import {ProjectsComponent} from './states/projects';
import {NewProjectComponent} from './states/new-project';
import {HowItWorksComponent} from './states/how-it-works';
import {NoContentComponent} from './states/no-content';

// Directives
import {MyFormError} from './directives/my-form-error';

// Services
import {AuthService} from './services/auth.service';
import {OnlyLoggedInUsersGuard} from './states/only-logged-in-users-guard';

// Components
import {ProjectFormComponent} from './components/project/project-form.component';

// Style
import '../styles/styles.scss';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AuthService,
  OnlyLoggedInUsersGuard
];

export function RestangularConfigFactory(RestangularProvider) {
  RestangularProvider.setBaseUrl(API_URL);
  //todo: use jwt here
  RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer UDXPx-Xko0w4BRKajozCVy20X11MRZs1'});
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectsComponent,
    NewProjectComponent,
    HowItWorksComponent,
    NoContentComponent,
    MyFormError,
    ProjectFormComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    NgbModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    RestangularModule.forRoot(RestangularConfigFactory),
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules})
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    {provide: ErrorHandler, useClass: MyErrorHandler}
  ]
})
export class AppModule {
  constructor() {}
}

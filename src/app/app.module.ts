import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule, ApplicationRef, ErrorHandler} from '@angular/core';
import {
  removeNgStyles,
  createNewHosts,
  createInputTransfer
} from '@angularclass/hmr';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

// Conditional modules
if (IS_DEV) {
  System.import('mimic').then();
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
import {AppState, InternalStateType} from './app.service';
import {MyErrorHandler} from './my-error-handler';

// States
import {HomeComponent} from './states/home';
import {SuppliersComponent} from './states/suppliers';
import {ProjectsComponent} from './states/projects';
import {HowItWorksComponent} from './states/how-it-works';
import {NoContentComponent} from './states/no-content';

// Directives
import {MyFormError} from './directives/my-form-error';

// Services
import {AuthService} from "./services/auth.service";

// Components
import {ProjectFormComponent} from './components/project/project-form.component';

// Style
import '../styles/styles.scss';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  AuthService
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

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
    SuppliersComponent,
    ProjectsComponent,
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

  constructor(public appRef: ApplicationRef,
              public appState: AppState) {
  }

  public hmrOnInit(store: StoreType) {
    if (!store || !store.state) {
      return;
    }
    console.log('HMR store', JSON.stringify(store, null, 2));
    /**
     * Set state
     */
    this.appState._state = store.state;
    /**
     * Set input values
     */
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  public hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map((cmp) => cmp.location.nativeElement);
    /**
     * Save state
     */
    const state = this.appState._state;
    store.state = state;
    /**
     * Recreate root elements
     */
    store.disposeOldHosts = createNewHosts(cmpLocation);
    /**
     * Save input values
     */
    store.restoreInputValues = createInputTransfer();
    /**
     * Remove styles
     */
    removeNgStyles();
  }

  public hmrAfterDestroy(store: StoreType) {
    /**
     * Display new elements
     */
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

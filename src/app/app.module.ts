import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {NgModule, ErrorHandler} from '@angular/core';
import {
  RouterModule,
  PreloadAllModules
} from '@angular/router';

// Third party modules
import {NgbModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {SlimLoadingBarModule} from 'ng2-slim-loading-bar';
import {RestangularModule} from 'ngx-restangular';
import {WizardModule} from 'ng2-archwizard/dist';

// Platform and Environment providers/directives/pipes
import {ENV_PROVIDERS} from './environment';
import {ROUTES} from './app.routes';
import {AppComponent} from './app.component';
import {APP_RESOLVER_PROVIDERS} from './app.resolver';
import {MyErrorHandler} from './my-error-handler';
import {RestangularConfigFactory} from './restangular';

// States
import {HomeComponent} from './states/home';
import {ChooseAccTypeComponent} from './states/choose-acc-type';
import {MyProjectsComponent} from './states/my-projects';
import {AllProjectsComponent} from './states/all-projects';
import {ViewProjectComponent} from './states/view-project/view-project.component';
import {ProjectComponent} from './states/project';
import {HowItWorksComponent} from './states/how-it-works';
import {NoContentComponent} from './states/no-content';

// Directives
import {MyCustomFileDirective} from './directives/my-custom-file.directive';

// Services
import {OnlyEntrepreneurGuard, OnlyLoggedInUsersGuard, OnlyStudentGuard} from './states/state-guards';
import {AuthService} from './services/auth.service';
import {GlobalLoaderService} from './services/global-loader.service';
import {WizardStepsService} from './services/wizard-steps.service';
import {ProjectService} from './services/project.service';
import {ApplicationService} from './services/application.service';

// Pipes
import {DecimalPipe, DatePipe} from '@angular/common';
import {Nl2listPipe, Nl2sepPipe} from './pipes/general.pipe';

// Components
import {ProjectFormComponent} from './components/project-form/project-form.component';
import {ProjectFormBuyerInfoComponent} from './components/project-form/project-form-buyer-info.component';
import {ProjectFormProjectInfoComponent} from './components/project-form/project-form-project-info.component';
import {ProjectFormDesignComponent} from './components/project-form/project-form-design.component';
import {ProjectFormMilestonesComponent} from './components/project-form/project-form-milestones.component';
import {ProjectFormFinalComponent} from './components/project-form/project-form-final.component';
import {ProjectBoxComponent} from './components/project-box.component';

// Modals
import {TokenNotVerifiedModalComponent} from './modals/token-not-verified-modal.component';
import {AccTypeConfirmModalComponent} from './modals/acc-type-confirm-modal.component';
import {ProjectRemoveConfirmModalComponent} from './modals/project-remove-confirm-modal.component';

// Style
import '../styles/styles.scss';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  OnlyLoggedInUsersGuard,
  OnlyEntrepreneurGuard,
  OnlyStudentGuard,
  AuthService,
  GlobalLoaderService,
  WizardStepsService,
  ProjectService,
  ApplicationService
];

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    MyCustomFileDirective,
    Nl2listPipe,
    Nl2sepPipe,
    AppComponent,
    HomeComponent,
    ChooseAccTypeComponent,
    MyProjectsComponent,
    AllProjectsComponent,
    ViewProjectComponent,
    ProjectComponent,
    HowItWorksComponent,
    NoContentComponent,
    ProjectFormComponent,
    ProjectFormBuyerInfoComponent,
    ProjectFormProjectInfoComponent,
    ProjectFormDesignComponent,
    ProjectFormMilestonesComponent,
    ProjectFormFinalComponent,
    ProjectBoxComponent,
    TokenNotVerifiedModalComponent,
    AccTypeConfirmModalComponent,
    ProjectRemoveConfirmModalComponent
  ],
  entryComponents: [
    HomeComponent,
    ChooseAccTypeComponent,
    MyProjectsComponent,
    AllProjectsComponent,
    TokenNotVerifiedModalComponent,
    AccTypeConfirmModalComponent,
    ProjectRemoveConfirmModalComponent
  ],
  /**
   * Import Angular's modules.
   */
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    WizardModule,
    NgbModule.forRoot(),
    SlimLoadingBarModule.forRoot(),
    RestangularModule.forRoot([NgbModal, AuthService], RestangularConfigFactory),
    RouterModule.forRoot(ROUTES, {useHash: true, preloadingStrategy: PreloadAllModules})
  ],
  /**
   * Expose our Services and Providers into Angular's dependency injection.
   */
  providers: [
    ENV_PROVIDERS,
    APP_PROVIDERS,
    DatePipe,
    DecimalPipe,
    {provide: ErrorHandler, useClass: MyErrorHandler}
  ]
})
export class AppModule {
  constructor() {}
}

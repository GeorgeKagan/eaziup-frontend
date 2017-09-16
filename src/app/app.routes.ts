import {Routes} from '@angular/router';
import {HomeComponent} from './states/home';
import {MyProjectsComponent} from './states/my-projects';
import {AllProjectsComponent} from './states/all-projects';
import {ProjectComponent} from './states/project';
import {HowItWorksComponent} from './states/how-it-works';
import {NoContentComponent} from './states/no-content';
import {CountriesResolver, CatsResolver, MyProjectsResolver, ProjectResolver, AllProjectsResolver} from './app.resolver';
import {OnlyEntrepreneurGuard, OnlyLoggedInUsersGuard, OnlyStudentGuard} from './states/state-guards';

export const ROUTES: Routes = [
  // ENTREPRENEUR

  // Add new project
  {
    path: 'project/add',
    component: ProjectComponent,
    resolve: {
      countries: CountriesResolver,
      cats: CatsResolver
    },
    canActivate: [OnlyLoggedInUsersGuard, OnlyEntrepreneurGuard]
  },
  // Edit project
  {
    path: 'project/edit/:id',
    component: ProjectComponent,
    resolve: {
      project: ProjectResolver,
      countries: CountriesResolver,
      cats: CatsResolver
    },
    canActivate: [OnlyLoggedInUsersGuard, OnlyEntrepreneurGuard]
  },

  // COMMON

  {path: 'how-it-works', component: HowItWorksComponent},
  {path: '**', component: NoContentComponent},
];

export const ROUTE_HOME_GUEST = {
  path: '',
  component: HomeComponent
};

export const ROUTE_HOME_STUDENT = {
  path: '',
  component: AllProjectsComponent,
  resolve: {
    projects: AllProjectsResolver
  },
  canActivate: [OnlyLoggedInUsersGuard, OnlyStudentGuard]
};

export const ROUTE_HOME_ENTREPRENEUR = {
  path: '',
  component: MyProjectsComponent,
  resolve: {
    projects: MyProjectsResolver
  },
  canActivate: [OnlyLoggedInUsersGuard, OnlyEntrepreneurGuard]
};

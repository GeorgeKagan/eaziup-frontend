import {Routes} from '@angular/router';
import {HomeComponent} from './states/home';
import {ProjectsComponent} from './states/projects';
import {ProjectComponent} from './states/project';
import {HowItWorksComponent} from './states/how-it-works';
import {NoContentComponent} from './states/no-content';
import {CountriesResolver, CatsResolver, ProjectsResolver, ProjectResolver} from './app.resolver';
import {OnlyLoggedInUsersGuard} from './states/only-logged-in-users-guard';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  // Ent - my projects
  {
    path: 'my-projects',
    component: ProjectsComponent,
    resolve: {
      projects: ProjectsResolver
    },
    canActivate: [OnlyLoggedInUsersGuard]
  },
  // Ent - add new project
  {
    path: 'project/add',
    component: ProjectComponent,
    resolve: {
      countries: CountriesResolver,
      cats: CatsResolver
    },
    canActivate: [OnlyLoggedInUsersGuard]
  },
  // Ent - view project
  {
    path: 'project/edit/:id',
    component: ProjectComponent,
    resolve: {
      project: ProjectResolver,
      countries: CountriesResolver,
      cats: CatsResolver
    },
    canActivate: [OnlyLoggedInUsersGuard]
  },
  {path: 'how-it-works', component: HowItWorksComponent},
  {path: '**', component: NoContentComponent},
];

import {Routes} from '@angular/router';
import {HomeComponent} from './states/home';
import {ProjectsComponent} from './states/projects';
import {NewProjectComponent} from './states/new-project';
import {HowItWorksComponent} from './states/how-it-works';
import {NoContentComponent} from './states/no-content';
import {CountriesResolver, CatsResolver} from './app.resolver';
import {OnlyLoggedInUsersGuard} from './states/only-logged-in-users-guard';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'projects', component: ProjectsComponent},
  {
    path: 'new-project',
    component: NewProjectComponent,
    resolve: {
      countries: CountriesResolver,
      cats: CatsResolver
    },
    canActivate: [OnlyLoggedInUsersGuard]
  },
  {path: 'how-it-works', component: HowItWorksComponent},
  {path: '**', component: NoContentComponent},
];

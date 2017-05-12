import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { SuppliersComponent } from './suppliers';
import { ProjectsComponent } from './projects';
import { HowItWorksComponent } from './how-it-works';
import { SignUpComponent } from './sign-up';
import { LogInComponent } from './log-in';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'suppliers', component: SuppliersComponent},
  {path: 'projects', component: ProjectsComponent},
  {path: 'how-it-works', component: HowItWorksComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'log-in', component: LogInComponent},
  {path: '**', component: NoContentComponent},
];

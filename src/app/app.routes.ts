import { Routes } from '@angular/router';
import { HomeComponent } from './states/home';
import { SuppliersComponent } from './states/suppliers';
import { ProjectsComponent } from './states/projects';
import { HowItWorksComponent } from './states/how-it-works';
import { SignUpComponent } from './states/sign-up';
import { LogInComponent } from './states/log-in';
import { NoContentComponent } from './states/no-content';

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

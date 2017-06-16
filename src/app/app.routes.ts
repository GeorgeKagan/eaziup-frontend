import { Routes } from '@angular/router';
import { HomeComponent } from './states/home';
import { SuppliersComponent } from './states/suppliers';
import { ProjectsComponent } from './states/projects';
import { HowItWorksComponent } from './states/how-it-works';
import { NoContentComponent } from './states/no-content';

import { CountriesResolver } from './app.resolver';

export const ROUTES: Routes = [
  {path: '', component: HomeComponent},
  {path: 'suppliers', component: SuppliersComponent},
  {path: 'projects', component: ProjectsComponent, resolve: {countries: CountriesResolver}},
  {path: 'how-it-works', component: HowItWorksComponent},
  {path: '**', component: NoContentComponent},
];

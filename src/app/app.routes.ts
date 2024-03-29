import { Routes } from '@angular/router';
import { HomeComponent } from './states/home';
import { MyProjectsComponent } from './states/my-projects';
import { AllProjectsComponent } from './states/all-projects';
import { ProjectComponent } from './states/project';
import { HowItWorksComponent } from './states/how-it-works';
import { NoContentComponent } from './states/no-content';
import { ChooseAccTypeComponent } from './states/choose-acc-type';
import { ViewProjectComponent } from './states/view-project';
import { ProjectApplicationsComponent } from './states/project-applications';
import { CountriesResolver } from './resolvers/countries.resolver';
import { CatsResolver } from './resolvers/cats.resolver';
import { ProjectResolver } from './resolvers/project.resolver';
import { ProjectApplicationsResolver } from './resolvers/project-applications.resolver';
import { AllProjectsResolver } from './resolvers/all-projects.resolver';
import { MyProjectsResolver } from './resolvers/my-projects.resolver';
import { OnlyLoggedInUsersGuard } from './guards/only-logged-in-users.guard';
import { OnlyEntrepreneurGuard } from './guards/only-entrepreneur.guard';
import { OnlyStudentGuard } from './guards/only-student.guard';

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
    // Manage project applications
    {
        path: 'project/:id/applications',
        component: ProjectApplicationsComponent,
        resolve: {
            project: ProjectResolver,
            applications: ProjectApplicationsResolver,
        },
        canActivate: [OnlyLoggedInUsersGuard, OnlyEntrepreneurGuard]
    },

    // COMMON

    // View project
    {
        path: 'project/:id',
        component: ViewProjectComponent,
        resolve: {
            project: ProjectResolver
        },
        canActivate: [OnlyLoggedInUsersGuard]
    },
    {path: 'how-it-works', component: HowItWorksComponent},
    {path: '**', component: NoContentComponent},
];

export const ROUTE_HOME_GUEST = {
    path: '',
    component: HomeComponent
};

export const ROUTE_HOME_CHOOSE = {
    path: '',
    component: ChooseAccTypeComponent,
    canActivate: [OnlyLoggedInUsersGuard]
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

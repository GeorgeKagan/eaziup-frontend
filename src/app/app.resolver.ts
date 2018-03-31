import { CountriesResolver } from './resolvers/countries.resolver';
import { MyProjectsResolver } from './resolvers/my-projects.resolver';
import { CatsResolver } from './resolvers/cats.resolver';
import { AllProjectsResolver } from './resolvers/all-projects.resolver';
import { ProjectResolver } from './resolvers/project.resolver';
import { ProjectApplicationsResolver } from './resolvers/project-applications.resolver';

/**
 * An array of services to resolve routes with data.
 */
export const APP_RESOLVER_PROVIDERS = [
    CountriesResolver,
    CatsResolver,
    MyProjectsResolver,
    AllProjectsResolver,
    ProjectResolver,
    ProjectApplicationsResolver
];

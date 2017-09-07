import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';
import {ProjectService} from './services/project.service';

@Injectable()
export class CountriesResolver implements Resolve<any> {
  constructor(private rest: Restangular) {}
  public resolve() {
    return this.rest.all('countries').customGET().toPromise();
  }
}

@Injectable()
export class CatsResolver implements Resolve<any> {
  constructor(private rest: Restangular) {}
  public resolve() {
    return this.rest.all('cats').customGET().toPromise();
  }
}

@Injectable()
export class ProjectsResolver implements Resolve<any> {
  constructor(private projectService: ProjectService) {}
  public resolve() {
    return this.projectService.getMyProjects();
  }
}

@Injectable()
export class ProjectResolver implements Resolve<any> {
  constructor(private projectService: ProjectService) {}
  public resolve(route: ActivatedRouteSnapshot) {
    return this.projectService.getProject(route.params.id);
  }
}

/**
 * An array of services to resolve routes with data.
 */
export const APP_RESOLVER_PROVIDERS = [
  CountriesResolver,
  CatsResolver,
  ProjectsResolver,
  ProjectResolver
];

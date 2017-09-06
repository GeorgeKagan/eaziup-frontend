import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Restangular} from 'ngx-restangular';
import {ProjectService} from './services/project.service';

@Injectable()
export class CountriesResolver implements Resolve<any> {
  constructor(private rest: Restangular) {}
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.rest.all('countries').customGET().toPromise();
  }
}

@Injectable()
export class CatsResolver implements Resolve<any> {
  constructor(private rest: Restangular) {}
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.rest.all('cats').customGET().toPromise();
  }
}

@Injectable()
export class ProjectsResolver implements Resolve<any> {
  constructor(private projectService: ProjectService) {}
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.projectService.getMyProjects();
  }
}

/**
 * An array of services to resolve routes with data.
 */
export const APP_RESOLVER_PROVIDERS = [
  CountriesResolver,
  CatsResolver,
  ProjectsResolver
];

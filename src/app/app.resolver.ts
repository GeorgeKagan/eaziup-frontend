import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class CountriesResolver implements Resolve<any> {
  constructor(private rest: Restangular) {}
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.rest.all('countries').customGET().toPromise();
  }
}

@Injectable()
export class CitiesResolver implements Resolve<any> {
  constructor(private rest: Restangular) {}
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.rest.all('cities').customGET().toPromise();
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
export class SubCatsResolver implements Resolve<any> {
  constructor(private rest: Restangular) {}
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.rest.all('subCats').customGET().toPromise();
  }
}

/**
 * An array of services to resolve routes with data.
 */
export const APP_RESOLVER_PROVIDERS = [
  CountriesResolver,
  CitiesResolver,
  CatsResolver,
  SubCatsResolver
];

import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {Restangular} from 'ngx-restangular';

@Injectable()
export class CountriesResolver implements Resolve<any> {
  constructor(private rest: Restangular) {}
  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.rest.all('countries').customGET();
  }
}

/**
 * An array of services to resolve routes with data.
 */
export const APP_RESOLVER_PROVIDERS = [
  CountriesResolver
];

import { Restangular } from 'ngx-restangular';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class CatsResolver implements Resolve<any> {
    constructor(private rest: Restangular) {
    }

    public resolve() {
        return this.rest.all('cats').customGET().toPromise();
    }
}

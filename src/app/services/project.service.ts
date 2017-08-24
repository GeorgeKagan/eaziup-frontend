import {Injectable} from '@angular/core';
import {Restangular} from "ngx-restangular";

@Injectable()
export class ProjectService {

  constructor(private rest: Restangular) {
  }

  public getData() {

  }

  public saveProject(data) {
    return this.rest.all('project').post(data);
  }
}

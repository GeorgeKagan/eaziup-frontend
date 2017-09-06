import {Injectable} from '@angular/core';
import {Restangular} from "ngx-restangular";

@Injectable()
export class ProjectService {

  constructor(private rest: Restangular) {
  }

  public getMyProjects() {
    return this.rest.all('project').customGET().toPromise();
  }

  public saveProject(data: object) {
    return this.rest.all('project').post(data);
  }
}

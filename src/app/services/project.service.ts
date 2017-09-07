import {Injectable} from '@angular/core';
import {Restangular} from "ngx-restangular";

@Injectable()
export class ProjectService {

  constructor(private rest: Restangular) {
  }

  public getMyProjects() {
    return this.rest.all('project').customGET().toPromise();
  }

  public getProject(projectId: number) {
    return this.rest.one('project', projectId).get();
  }

  public saveProject(data: object) {
    return this.rest.all('project').post(data);
  }

  public removeProject(projectId: number) {
    return this.rest.one('project', projectId).remove();
  }
}

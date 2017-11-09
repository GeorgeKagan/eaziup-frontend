import {Injectable} from '@angular/core';
import {Restangular} from "ngx-restangular";

@Injectable()
export class ApplicationService {
  constructor(private rest: Restangular) {
  }

  /**
   * Student applies for a project
   * @param projectId
   * @returns {any}
   */
  public studentApply(projectId) {
    return this.rest.one('project/apply', projectId).post();
  }
}

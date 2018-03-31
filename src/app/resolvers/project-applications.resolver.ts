import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ProjectApplicationsResolver implements Resolve<any> {
    constructor(private projectService: ProjectService) {
    }

    public resolve(route: ActivatedRouteSnapshot) {
        return this.projectService.getProjectApplications(route.params.id);
    }
}

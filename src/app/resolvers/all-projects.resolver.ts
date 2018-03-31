import { ProjectService } from '../services/project.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class AllProjectsResolver implements Resolve<any> {
    constructor(private projectService: ProjectService) {
    }

    public resolve() {
        return this.projectService.getAllProjects();
    }
}

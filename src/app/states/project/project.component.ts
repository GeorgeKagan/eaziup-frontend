import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'project',
    template: `
        <div class="container pb-5">
            <div class="col-sm-12">
                <h3 class="mb-4">{{isEditMode ? 'Modify project "' + project.name + '"' : 'Add new project'}}</h3>
                <project-form></project-form>
            </div>
        </div>
    `
})
export class ProjectComponent implements OnInit {
    private isEditMode: boolean = false;
    private project: object = null;

    constructor(private route: ActivatedRoute) {
    }

    public ngOnInit() {
        this.route.params.subscribe((params) => {
            this.isEditMode = !!params.id;
        });
        this.route.data.subscribe((data) => {
            this.project = data.project || null;
        });
    }
}

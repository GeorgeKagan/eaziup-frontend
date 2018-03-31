import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { fadeIn, fadeOut, slideDown } from '../../consts/animations';
import { ICONS } from '../../consts/icons';
import { CONFIG } from '../../consts/config';

@Component({
    selector: 'project-applications',
    templateUrl: 'project-applications.component.html',
    animations: [fadeIn, fadeOut, slideDown]
})
export class ProjectApplicationsComponent implements OnInit {
    public CONFIG: any;
    public ICONS: object;
    public project: object = {};
    public applications: any[] = [];

    constructor(private route: ActivatedRoute) {
        this.CONFIG = CONFIG;
        this.ICONS = ICONS;
    }

    public ngOnInit() {
        this.route.data.subscribe((data) => {
            this.project = data.project;
            this.applications = data.applications;
        });
    }
}

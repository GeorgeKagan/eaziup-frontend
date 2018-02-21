import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {fadeIn, fadeOut, slideDown} from '../../consts/animations';
import {ICONS} from '../../consts/icons';
import {CONFIG} from '../../consts/config';

@Component({
  selector: 'project-applications',
  templateUrl: 'project-applications.component.html',
  animations: [fadeIn, fadeOut, slideDown]
})
export class ProjectApplicationsComponent implements OnInit {
  CONFIG: any;
  ICONS: object;
  project: object = {};
  applications: any[] = [];
  
  constructor(private route: ActivatedRoute) {
    this.CONFIG = CONFIG;
    this.ICONS = ICONS;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      console.log(data);
      this.project = data.project;
      this.applications = data.applications;
    });
  }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CONFIG} from '../../consts/config';

@Component({
  selector: 'all-projects',
  templateUrl: 'all-projects.component.html'
})
export class AllProjectsComponent implements OnInit {
  newProjects: any[] = [];
  appliedToProjects: any[] = [];
  inWorkProjects: any[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.newProjects = data.projects.filter(x => x.is_applied === 0);
      this.appliedToProjects = data.projects.filter(x => x.is_applied === 1);
      this.inWorkProjects = data.projects.filter(x => x.is_applied === 1 && x.status === CONFIG.PROJECT.IN_WORK);
    });
  }
}

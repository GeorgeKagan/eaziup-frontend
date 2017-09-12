import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'all-projects',
  templateUrl: 'all-projects.component.html'
})
export class AllProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.projects = data.projects;
    });
  }
}

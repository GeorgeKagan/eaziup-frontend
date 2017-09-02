import {
  Component,
  OnInit
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'projects',
  template: `
    <div class="container pb-5">
      <div class="col-sm-12">
        <h3 class="mb-4">My Projects</h3>
        <p class="lead mb-4">View and manage your projects here</p>
        <div class="row ml-0 mr-0">
          <div class="card col-md-5 pr-0 pl-0 mr-4 mb-4" *ngFor="let p of projects">
            <div class="card-block">
              <h4 class="card-title ez-green">
                {{p.name}}
              </h4>
              <h6 class="card-subtitle mb-2 text-muted">
                {{p.cat.name}} by {{p.company}}
              </h6>
              <hr>
              <p class="card-text mb-4" [innerHTML]="p.desc | nl2br"></p>
              <a href="#" class="card-link">
                <i class="fa fa-sliders mr-1"></i>
                Modify
              </a>
              <a href="#" class="card-link">
                <i class="fa fa-trash-o mr-1"></i>
                Remove
              </a>
            </div>
            <div class="card-footer text-muted text-center">
              <i class="fa fa-calendar-o mr-1"></i> Starts <strong>{{p.start_date | date}}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProjectsComponent implements OnInit {
  projects: any[] = [];

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.projects = data.projects;
    });
  }
}

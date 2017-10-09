import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'view-project',
  templateUrl: 'view-project.component.html'
})
export class ViewProjectComponent implements OnInit {
  private project: object = null;

  constructor(private route: ActivatedRoute,
              private auth: AuthService) {
  }

  public ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data.project || null;
    });
  }

  public applyToProject() {

  }
}

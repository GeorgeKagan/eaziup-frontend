import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {DatePipe, DecimalPipe} from '@angular/common';
import {ICONS} from '../../consts/icons';
import {ProjectService} from '../../services/project.service';
import {GlobalLoaderService} from '../../services/global-loader.service';
import {ApplicationService} from '../../services/application.service';

@Component({
  selector: 'view-project',
  templateUrl: 'view-project.component.html'
})
export class ViewProjectComponent implements OnInit {
  blocks: object[] = [];
  sidebarItems: object[] = [];
  project: any = null;
  isApplied: boolean = false;

  constructor(private route: ActivatedRoute,
              private datePipe: DatePipe,
              private decimalPipe: DecimalPipe,
              private applyService: ApplicationService,
              private globalLoader: GlobalLoaderService,
              public auth: AuthService) {
  }

  public ngOnInit() {
    this.route.data.subscribe(data => {
      this.project = data.project || null;
      this.project.milestones = JSON.parse(this.project.milestones_json);

      this.blocks = [
        {icon: ICONS.QUICK, title: 'Quick intro', body: this.project.desc},
        {icon: ICONS.REQS, title: 'Dev Requirements', list: [
          {title: 'Developers', body: `Team of <strong>${this.project.dev_count}</strong>`},
          {title: 'Technology stack', body: this.project.tech_reqs},
          {title: 'Communication', body: this.project.dev_reqs},
          {title: 'Operating systems', body: this.project.os_reqs},
        ]},
        {icon: ICONS.INFO, title: 'Full description', body: this.project.full_desc}
      ];

      this.sidebarItems = [
        {title: 'Starts', body: this.datePipe.transform(this.project.start_date)},
        {title: 'Delivery', body: this.datePipe.transform(ProjectService.calculateDeliveryDate(this.project.start_date, this.project.milestones))},
        {title: 'Status', body: this.project.status.toUpperCase()},
        {title: 'Created', body: this.datePipe.transform(this.project.created_at)},
        {title: 'Updated', body: this.datePipe.transform(this.project.updated_at)},
        {title: 'Compensation', body: this.decimalPipe.transform(ProjectService.calculateCompenstation(this.project.dev_count, this.project.milestones.length)) + ' ILS'}
      ];
    });
  }

  /**
   * Student applies for a project
   * @param projectId
   */
  public applyToProject(projectId) {
      this.globalLoader.emitChange(true);
      this.applyService.studentApply(projectId).subscribe(() => {
        this.project.application.isApplied = true;
        this.globalLoader.emitChange(false);
      });
  }

  /**
   * Student cancels application
   * @param projectId
   */
  public cancelApplication(projectId) {
    this.globalLoader.emitChange(true);
    this.applyService.studentApplyCancel(projectId).subscribe(() => {
      this.project.application.isApplied = false;
      this.globalLoader.emitChange(false);
    });
  }
}

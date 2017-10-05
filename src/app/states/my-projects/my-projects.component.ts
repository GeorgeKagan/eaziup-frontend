import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project.service';
import {fadeIn, fadeOut, slideDown} from '../../consts/animations';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CONFIG} from '../../consts/config';
import {ProjectRemoveConfirmModalComponent} from '../../modals/project-remove-confirm-modal.component';

@Component({
  selector: 'my-projects',
  templateUrl: 'my-projects.component.html',
  animations: [fadeIn, fadeOut, slideDown]
})
export class MyProjectsComponent implements OnInit {
  CONFIG: any;
  projects: any[] = [];

  constructor(private route: ActivatedRoute,
              private modalService: NgbModal,
              private projectService: ProjectService) {
    this.CONFIG = CONFIG;
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.projects = data.projects;
    });
  }

  /**
   * Confirm removal of projects.
   * If yes - ask API to delete and then splice it out of the array.
   * @param project
   * @param {number} i
   */
  confirmRemove(project: any, i: number) {
    this.modalService.open(ProjectRemoveConfirmModalComponent).result.then(() => {
      this.projectService.removeProject(project.id);
      this.projects.splice(i, 1);
    }, () => {});
  }
}

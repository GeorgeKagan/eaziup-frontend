import {Component} from '@angular/core';
import {countries} from './data-model';
import {BuyerInfo, ProjectInfo} from './project';
import {ProjectService} from '../../services/project.service';
import {MyFormComponent} from '../my-form/my-form.component';
import {slideDown} from '../../consts/animations';
import {formErrors, validationMessages} from './project-form-errors'

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  providers: [ProjectService],
  animations: [slideDown]
})
export class ProjectFormComponent extends MyFormComponent {
  countries = countries;

  constructor(private projectService: ProjectService) {
    super();
    this.setFormErrors(formErrors);
    this.setValidationMessages(validationMessages);
  }

  /**
   * Build project form
   */
  buildForm() {
    this.myForm = this.fb.group({
      buyerInfo: this.fb.group(new BuyerInfo()),
      projectInfo: this.fb.group(new ProjectInfo())
    });
    super.buildForm();
  }

  /**
   * Save project if form valid
   */
  onSubmit() {
    if (this.isValid()) {
      this.projectService.saveProject(this.getPayload());
    }
    super.onSubmit();
  }
}

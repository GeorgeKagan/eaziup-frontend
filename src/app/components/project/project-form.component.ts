import {Component} from '@angular/core';
import {BuyerInfo, ProjectInfo} from './project';
import {ProjectService} from '../../services/project.service';
import {MyFormComponent} from '../my-form/my-form.component';
import {slideDown} from '../../consts/animations';
import {formErrors, validationMessages} from './project-form-errors'
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  providers: [ProjectService],
  animations: [slideDown]
})
export class ProjectFormComponent extends MyFormComponent {
  countries: string[] = [];

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService) {
    super();
  }

  ngOnInit() {
    this.init();
    this.setFormErrors(formErrors);
    this.setValidationMessages(validationMessages);
    // All form data is to be fetched via resolves
    this.route.data.subscribe(data => this.countries = data.countries);
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

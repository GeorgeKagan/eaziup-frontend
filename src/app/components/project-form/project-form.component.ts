import {Component} from '@angular/core';
import {BuyerInfoModel, ProjectInfoModel, DesignModel} from './project-form-model';
import {ProjectService} from '../../services/project.service';
import {MyFormComponent} from '../my-form/my-form.component';
import {formErrors, validationMessages} from './project-form-errors'
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  providers: [ProjectService]
})
export class ProjectFormComponent extends MyFormComponent {
  countries: string[] = [];
  cats: string[] = [];

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService) {
    super();
  }

  ngOnInit() {
    this.init();
    this.setFormErrors(formErrors);
    this.setValidationMessages(validationMessages);
    // All form data is to be fetched via resolves
    this.route.data.subscribe(data => {
      this.countries = data.countries;
      this.cats = data.cats;
    });
  }

  /**
   * Build project form
   */
  buildForm() {
    this.myForm = this.fb.group({
      buyerInfo: this.fb.group(new BuyerInfoModel()),
      projectInfo: this.fb.group(new ProjectInfoModel()),
      design: this.fb.group(new DesignModel())
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

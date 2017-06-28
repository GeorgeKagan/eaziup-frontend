import {Component} from '@angular/core';
import {BuyerInfo, ProjectInfo} from './project-form-model';
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
  cities: string[] = [];
  cats: string[] = [];
  subCats: string[] = [];

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
      this.cities = data.cities;
      this.cats = data.cats;
      this.subCats = data.subCats;
    });
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

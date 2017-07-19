import {Component} from '@angular/core';
import {BuyerInfoModel, ProjectInfoModel, DesignModel, MilestonesModel, FinalModel} from './project-form-model';
import {ProjectService} from '../../services/project.service';
import {GlobalLoaderService} from '../../services/global-loader.service';
import {MyFormComponent} from '../my-form/my-form.component';
import {formErrors, validationMessages} from './project-form-errors'
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html'
})
export class ProjectFormComponent extends MyFormComponent {
  countries: string[] = [];
  cats: string[] = [];
  isSubmitted: boolean = false;
  milestones: FormGroup;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private globalLoader: GlobalLoaderService) {
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
    this.milestones = this.fb.group(new MilestonesModel());
    this.myForm = this.fb.group({
      buyerInfo: this.fb.group(new BuyerInfoModel()),
      projectInfo: this.fb.group(new ProjectInfoModel()),
      design: this.fb.group(new DesignModel()),
      milestones: this.milestones,
      final: this.fb.group(new FinalModel())
    });
    super.buildForm();
  }

  /**
   * Save project if form valid
   */
  onSubmit() {
    if (this.isValid()) {
      this.globalLoader.emitChange(true);
      this.projectService.saveProject(this.getPayload()).subscribe(() => {
        this.isSubmitted = true;
        this.globalLoader.emitChange(false);
      });
    }
    super.onSubmit();
  }
}

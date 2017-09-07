import {Component} from '@angular/core';
import {BuyerInfoModel, ProjectInfoModel, DesignModel, MilestonesModel, FinalModel} from './project-form-model';
import {ProjectService} from '../../services/project.service';
import {GlobalLoaderService} from '../../services/global-loader.service';
import {WizardStepsService} from '../../services/wizard-steps.service';
import {MyFormComponent} from '../my-form/my-form.component';
import {formErrors, validationMessages} from './project-form-errors'
import {ActivatedRoute} from '@angular/router';
import {FormGroup} from '@angular/forms';
import {MovingDirection} from 'ng2-archwizard/dist';
import {CONFIG} from '../../consts/config';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html'
})
export class ProjectFormComponent extends MyFormComponent {
  countries: string[] = [];
  cats: string[] = [];
  isSubmitted: boolean = false;
  milestones: FormGroup;

  private CONFIG;

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private globalLoader: GlobalLoaderService,
              private wizardSteps: WizardStepsService) {
    super();
    this.CONFIG = CONFIG;
  }

  ngOnInit() {
    // All form data is to be fetched via resolves
    this.route.data.subscribe(data => {
      this.countries = data.countries;
      this.cats = data.cats;
      this.init(data.project || null);
      this.setFormErrors(formErrors);
      this.setValidationMessages(validationMessages);
    });
  }

  /**
   * Build project form
   * @param {Object} project
   */
  buildForm(project: object = null) {
    this.milestones = this.fb.group(new MilestonesModel(project));
    this.myForm = this.fb.group({
      buyerInfo: this.fb.group(new BuyerInfoModel(project)),
      projectInfo: this.fb.group(new ProjectInfoModel(project)),
      design: this.fb.group(new DesignModel(project)),
      milestones: this.milestones,
      final: this.fb.group(new FinalModel())
    });
    super.buildForm();
  }

  /**
   * Logic to run before moving on to the next step
   * @param direction
   * @param index
   */
  initStep(direction, index) {
    if (direction === MovingDirection.Forwards) {
      this.wizardSteps.emitChange(index);
    }
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

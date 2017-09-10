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
  isEditMode: boolean = false;
  isSubmitted: boolean = false;
  milestones: FormGroup;
  project: object = null;

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
      this.project = data.project || null;
      this.countries = data.countries;
      this.cats = data.cats;
      this.init();
      this.setFormErrors(formErrors);
      this.setValidationMessages(validationMessages);
    });
    this.route.params.subscribe(params => {
      this.isEditMode = !!params.id;
    });
  }

  /**
   * Build project form
   */
  buildForm() {
    this.milestones = this.fb.group(new MilestonesModel(this.project));
    this.myForm = this.fb.group({
      buyerInfo: this.fb.group(new BuyerInfoModel(this.project)),
      projectInfo: this.fb.group(new ProjectInfoModel(this.project)),
      design: this.fb.group(new DesignModel(this.project)),
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
      let payload = this.getPayload();
      if (this.isEditMode) {
        payload.id = this.project['id'];
      }
      this.globalLoader.emitChange(true);
      this.projectService.saveProject(payload).subscribe(() => {
        this.isSubmitted = true;
        this.globalLoader.emitChange(false);
      });
    }
    super.onSubmit();
  }
}

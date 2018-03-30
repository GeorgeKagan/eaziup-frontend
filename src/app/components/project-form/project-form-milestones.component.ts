import { Component, Input, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {slideDown} from '../../consts/animations';
import {CONFIG} from '../../consts/config';
import {MilestonesModel} from './project-form-model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {WizardStepsService} from '../../services/wizard-steps.service';

@Component({
  selector: 'project-form-milestones',
  templateUrl: './project-form-milestones.component.html',
  animations: [slideDown]
})
export class ProjectFormMilestonesComponent implements OnInit {
  @Input() fb: FormBuilder;
  @Input() myForm: FormGroup;
  @Input() milestones: FormGroup;
  @Input() formErrors: object = {};
  @Input() gotError: Function;

  public developerCounts = CONFIG.DEV_COUNT;

  private CONFIG;
  /**
   * Min date is today
   * @type NgbDateStruct
   */
  private minStartDate: NgbDateStruct = {day: null, month: null, year: null};
  /**
   * Max date is today + 1 year
   * @type NgbDateStruct
   */
  private maxStartDate: NgbDateStruct = {day: null, month: null, year: null};
  /**
   * Has value in edit mode
   * @type NgbDateStruct
   */
  private initialStartDate: NgbDateStruct = {day: null, month: null, year: null};

  constructor(private wizardSteps: WizardStepsService) {}

  ngOnInit() {
    let today = new Date();
    this.CONFIG = CONFIG;
    this.minStartDate = {day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear()};
    this.maxStartDate = {day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear() + 1};

    // Edit mode - workaround for pre-filling the date input
    if (this.milestones.controls['startDate'].value) {
      let parts = this.milestones.controls['startDate'].value.split('-');
      this.initialStartDate = {year: parseInt(parts[0]), month: parseInt(parts[1]), day: parseInt(parts[2])};
    }

    this.wizardSteps.changeEmitted$.filter(index => index === CONFIG.WIZARD.STEPS.MILESTONES).subscribe(index => {

    });
  }

  /**
   * Add a new milestone to the array group of the form
   */
  addMilestone() {
    let arr = <FormArray>this.milestones.get('arr'),
        newMilestone = this.fb.group(MilestonesModel.getMilestoneStub());
    arr.push(newMilestone);
  }

  /**
   * Remove milestone from the model
   * @param index
   */
  removeMilestone(index) {
    let arr = <FormArray>this.milestones.get('arr');
    arr.removeAt(index);
  }
}

import {Component, Input} from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {slideDown} from '../../consts/animations';
import {CONFIG} from '../../consts/config';
import {MilestonesModel} from './project-form-model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'project-form-milestones',
  templateUrl: './project-form-milestones.component.html',
  animations: [slideDown]
})
export class ProjectFormMilestonesComponent {
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

  ngOnInit() {
    let today = new Date();
    this.CONFIG = CONFIG;
    this.minStartDate = {day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear()};
    this.maxStartDate = {day: today.getDate(), month: today.getMonth() + 1, year: today.getFullYear() + 1};
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

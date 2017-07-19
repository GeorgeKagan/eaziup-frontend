import {Component, Input} from '@angular/core';
import {FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {slideDown} from '../../consts/animations';
import {CONFIG} from '../../consts/config';
import {MilestonesModel} from './project-form-model';

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

  private CONFIG;

  ngOnInit() {
    this.CONFIG = CONFIG;
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

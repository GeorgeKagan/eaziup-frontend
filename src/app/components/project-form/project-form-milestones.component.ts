import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {slideDown} from '../../consts/animations';

@Component({
  selector: 'project-form-milestones',
  templateUrl: './project-form-milestones.component.html',
  animations: [slideDown]
})
export class ProjectFormMilestonesComponent {
  @Input() myForm: FormGroup;
  @Input() formErrors: object = {};
  @Input() gotError: Function;
}

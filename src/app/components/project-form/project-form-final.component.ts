import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {slideDown} from '../../consts/animations';

@Component({
  selector: 'project-form-final',
  templateUrl: './project-form-final.component.html',
  animations: [slideDown]
})
export class ProjectFormFinalComponent {
  @Input() myForm: FormGroup;
  @Input() formErrors: object = {};
  @Input() gotError: Function;
}

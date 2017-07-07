import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {slideDown} from '../../consts/animations';

@Component({
  selector: 'project-form-design',
  templateUrl: './project-form-design.component.html',
  animations: [slideDown]
})
export class ProjectFormDesignComponent {
  @Input() myForm: FormGroup;
  @Input() formErrors: object = {};
  @Input() gotError: Function;
}

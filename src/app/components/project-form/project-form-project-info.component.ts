import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {slideDown} from '../../consts/animations';

@Component({
  selector: 'project-form-project-info',
  templateUrl: './project-form-project-info.component.html',
  animations: [slideDown]
})
export class ProjectFormProjectInfoComponent {
  @Input() myForm: FormGroup;
  @Input() formErrors: object = {};
  @Input() gotError: Function;
  @Input() cats: string[] = [];
}

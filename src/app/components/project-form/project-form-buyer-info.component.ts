import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {slideDown} from '../../consts/animations';

@Component({
  selector: 'project-form-buyer-info',
  templateUrl: './project-form-buyer-info.component.html',
  animations: [slideDown]
})
export class ProjectFormBuyerInfoComponent {
  @Input() myForm: FormGroup;
  @Input() formErrors: object = {};
  @Input() gotError: Function;
  @Input() countries: string[] = [];
  @Input() cities: string[] = [];
}

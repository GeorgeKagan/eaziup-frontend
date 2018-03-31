import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { slideDown } from '../../consts/animations';
import 'rxjs/add/operator/filter';

@Component({
    selector: 'project-form-buyer-info',
    templateUrl: './project-form-buyer-info.component.html',
    animations: [slideDown]
})
export class ProjectFormBuyerInfoComponent {
    @Input() public myForm: FormGroup;
    @Input() public formErrors: object = {};
    @Input() public gotError: Function;
    @Input() public countries: string[] = [];
}

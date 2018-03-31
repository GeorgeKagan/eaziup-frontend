import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { slideDown } from '../../consts/animations';

@Component({
    selector: 'project-form-design',
    templateUrl: './project-form-design.component.html',
    animations: [slideDown]
})
export class ProjectFormDesignComponent {
    @Input() public myForm: FormGroup;
    @Input() public formErrors: object = {};
    @Input() public gotError: Function;
}

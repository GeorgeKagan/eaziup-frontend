import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { slideDown } from '../../consts/animations';
import { CONFIG } from '../../consts/config';

@Component({
    selector: 'project-form-project-info',
    templateUrl: './project-form-project-info.component.html',
    animations: [slideDown]
})
export class ProjectFormProjectInfoComponent {
    @Input() public myForm: FormGroup;
    @Input() public formErrors: object = {};
    @Input() public gotError: Function;
    @Input() public cats: string[] = [];

    public operatingSystems = CONFIG.OS;
}

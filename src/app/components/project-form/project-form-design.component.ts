import { Component, Input, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {slideDown} from '../../consts/animations';
import {WizardStepsService} from '../../services/wizard-steps.service';
import {CONFIG} from '../../consts/config';

@Component({
  selector: 'project-form-design',
  templateUrl: './project-form-design.component.html',
  animations: [slideDown]
})
export class ProjectFormDesignComponent implements OnInit {
  @Input() myForm: FormGroup;
  @Input() formErrors: object = {};
  @Input() gotError: Function;

  constructor(private wizardSteps: WizardStepsService) {}

  ngOnInit() {
    this.wizardSteps.changeEmitted$.filter(index => index === CONFIG.WIZARD.STEPS.DESIGN).subscribe(index => {

    });
  }
}

import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {slideDown} from '../../consts/animations';
import {WizardStepsService} from '../../services/wizard-steps.service';
import {CONFIG} from '../../consts/config';

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

  constructor(private wizardSteps: WizardStepsService) {}

  ngOnInit() {
    this.wizardSteps.changeEmitted$.filter(index => index === CONFIG.WIZARD.STEPS.GENERAL).subscribe(index => {

    });
  }
}

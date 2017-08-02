import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {slideDown} from '../../consts/animations';
import {CONFIG} from '../../consts/config';
import {WizardStepsService} from '../../services/wizard-steps.service';

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

  public operatingSystems = CONFIG.OS;

  constructor(private wizardSteps: WizardStepsService) {}

  ngOnInit() {
    this.wizardSteps.changeEmitted$.filter(index => index === CONFIG.WIZARD.STEPS.INFO).subscribe(index => {

    });
  }
}

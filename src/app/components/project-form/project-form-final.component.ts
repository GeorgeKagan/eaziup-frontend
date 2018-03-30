import { Component, Input, OnInit } from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {slideDown} from '../../consts/animations';
import {WizardStepsService} from '../../services/wizard-steps.service';
import {CONFIG} from '../../consts/config';

@Component({
  selector: 'project-form-final',
  templateUrl: './project-form-final.component.html',
  animations: [slideDown]
})
export class ProjectFormFinalComponent implements OnInit {
  @Input() myForm: FormGroup;
  @Input() formErrors: object = {};
  @Input() gotError: Function;
  @Input() isEditMode: boolean = false;

  public pricing: any;

  private CONFIG;
  private devCount: number = 0;
  private milestoneCount: number = 0;

  constructor(private wizardSteps: WizardStepsService) {
    this.CONFIG = CONFIG;
  }

  ngOnInit() {
    this.wizardSteps.changeEmitted$.filter(index => index === CONFIG.WIZARD.STEPS.FINAL).subscribe(() => {
      this.pricing = CONFIG.WIZARD.PRICING.map(price => Object.assign({}, price));
      this.devCount = parseInt(this.myForm.get(['milestones', 'developerCount']).value, 10);
      this.milestoneCount = (<FormArray>this.myForm.get(['milestones', 'arr'])).length;

      // Select price depending on dev/milestone counts
      for (let i = 0; i < this.pricing.length; i++) {
        if (this.devCount === this.pricing[i].devs && this.milestoneCount <= this.pricing[i].maxStones) {
          this.pricing[i].isSelected = true;
          break;
        }
      }
    });
  }
}

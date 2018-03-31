import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { slideDown } from '../../consts/animations';
import { WizardStepsService } from '../../services/wizard-steps.service';
import { CONFIG } from '../../consts/config';

@Component({
    selector: 'project-form-final',
    templateUrl: './project-form-final.component.html',
    animations: [slideDown]
})
export class ProjectFormFinalComponent implements OnInit {
    @Input() public myForm: FormGroup;
    @Input() public formErrors: object = {};
    @Input() public gotError: Function;
    @Input() public isEditMode: boolean = false;

    public pricing: any;

    private CONFIG;
    private devCount: number = 0;
    private milestoneCount: number = 0;

    constructor(private wizardSteps: WizardStepsService) {
        this.CONFIG = CONFIG;
    }

    public ngOnInit() {
        this.wizardSteps.changeEmitted$.filter((index) => index === CONFIG.WIZARD.STEPS.FINAL).subscribe(() => {
            this.pricing = CONFIG.WIZARD.PRICING.map((price) => Object.assign({}, price));
            this.devCount = parseInt(this.myForm.get(['milestones', 'developerCount']).value, 10);
            this.milestoneCount = (<FormArray> this.myForm.get(['milestones', 'arr'])).length;

            // Select price depending on dev/milestone counts
            for (let price of this.pricing) {
                if (this.devCount === price.devs && this.milestoneCount <= price.maxStones) {
                    price.isSelected = true;
                    break;
                }
            }
        });
    }
}

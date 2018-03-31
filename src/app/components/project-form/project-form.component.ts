import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { GlobalLoaderService } from '../../services/global-loader.service';
import { WizardStepsService } from '../../services/wizard-steps.service';
import { MyFormComponent } from '../my-form/my-form.component';
import { formErrors, validationMessages } from './project-form-errors';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MovingDirection } from 'ng2-archwizard/dist';
import { CONFIG } from '../../consts/config';
import { MilestonesModel } from '../../models/project-form/milestones.model';
import { BuyerInfoModel } from '../../models/project-form/buyer-info.model';
import { ProjectInfoModel } from '../../models/project-form/project-info.model';
import { DesignModel } from '../../models/project-form/design.model';
import { FinalModel } from '../../models/project-form/final.model';

@Component({
    selector: 'project-form',
    templateUrl: './project-form.component.html'
})
export class ProjectFormComponent extends MyFormComponent implements OnInit {
    public countries: string[] = [];
    public cats: string[] = [];
    public isEditMode: boolean = false;
    public isSubmitted: boolean = false;
    public milestones: FormGroup;
    public project: object = null;

    private CONFIG;

    constructor(private route: ActivatedRoute,
                private projectService: ProjectService,
                private globalLoader: GlobalLoaderService,
                private wizardSteps: WizardStepsService) {
        super();
        this.CONFIG = CONFIG;
    }

    public ngOnInit() {
        // All form data is to be fetched via resolves
        this.route.data.subscribe((data) => {
            this.project = data.project || null;
            this.countries = data.countries;
            this.cats = data.cats;
            this.init();
            this.setFormErrors(formErrors);
            this.setValidationMessages(validationMessages);
        });
        this.route.params.subscribe((params) => {
            this.isEditMode = !!params.id;
        });
    }

    /**
     * Build project form
     */
    public buildForm() {
        this.milestones = this.fb.group(<any> new MilestonesModel(this.project));
        this.myForm = this.fb.group({
            buyerInfo: this.fb.group(<any> new BuyerInfoModel(this.project)),
            projectInfo: this.fb.group(<any> new ProjectInfoModel(this.project)),
            design: this.fb.group(<any> new DesignModel(this.project)),
            milestones: this.milestones,
            final: this.fb.group(<any> new FinalModel())
        });
        super.buildForm();
    }

    /**
     * Logic to run before moving on to the next step
     * @param direction
     * @param index
     */
    public initStep(direction, index) {
        if (direction === MovingDirection.Forwards) {
            this.wizardSteps.emitChange(index);
        }
    }

    /**
     * Save project if form valid
     */
    public onSubmit() {
        if (this.isValid()) {
            let payload = this.getPayload();
            if (this.isEditMode) {
                payload.id = this.project['id'];
            }
            this.globalLoader.emitChange(true);
            this.projectService.saveProject(payload).subscribe(() => {
                this.isSubmitted = true;
                this.globalLoader.emitChange(false);
            });
        }
        super.onSubmit();
    }
}

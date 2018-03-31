import { FormBuilder, Validators } from '@angular/forms';
import { CONFIG } from '../../consts/config';

const IS_FILL_DUMMY = IS_DEV && false;

export class MilestonesModel {
    /**
     * Return a milestone stub, used when user adds new ones
     * @returns {}
     */
    public static getMilestoneStub() {
        return {
            name: ['', Validators.required],
            timespan: [
                CONFIG.WIZARD.DEFAULT_TIMESPAN,
                [Validators.required, Validators.min(CONFIG.WIZARD.MIN_TIMESPAN), Validators.max(CONFIG.WIZARD.MAX_TIMESPAN)]
            ],
            desc: ['', Validators.required]
        };
    }

    public arr;
    public startDate = ['', Validators.required];
    public developerCount = [CONFIG.DEFAULTS.DEV_COUNT];

    constructor(data: any = null) {
        let fb = new FormBuilder();

        // Edit mode
        if (data) {
            let milestones = JSON.parse(data.milestones_json);
            this.buildMilestones(fb, milestones.length);

            this.startDate[0] = data.start_date;
            this.developerCount[0] = data.dev_count + '';

            if (milestones.length) {
                for (let i = 0; i < milestones.length; i++) {
                    this.arr.get([i, 'name']).setValue(milestones[i].name);
                    this.arr.get([i, 'timespan']).setValue(milestones[i].timespan);
                    this.arr.get([i, 'desc']).setValue(milestones[i].desc);
                }
            }
        } else if (IS_FILL_DUMMY) {
            this.buildMilestones(fb);
            this.arr.get([0, 'name']).setValue('Example milestone');
            this.arr.get([0, 'timespan']).setValue(2);
            this.arr.get([0, 'desc']).setValue('Full description of milestone');
        } else {
            this.buildMilestones(fb);
        }
    }

    /**
     * Build milestones array of n-length
     * @param fb
     * @param {number} count
     */
    private buildMilestones(fb, count: number = 1) {
        let arr = [];
        for (let i = 0; i < count; i++) {
            arr.push(fb.group(MilestonesModel.getMilestoneStub()));
        }
        this.arr = fb.array(arr);
    }
}

import { FormBuilder, Validators } from '@angular/forms';
import { CONFIG } from '../../consts/config';

const IS_FILL_DUMMY = IS_DEV && false;

export class ProjectInfoModel {
    public projectName = ['', [Validators.required, Validators.minLength(4)]];
    public cat = ['', Validators.required];
    public basicDesc = ['', Validators.required];
    public fullDesc = ['', Validators.required];
    public techReqs = ['', Validators.required];
    public developerReqs = ['', Validators.required];
    public osReqs;

    constructor(data: any = null) {
        let fb = new FormBuilder();

        this.buildOsRequirements(fb);

        // Edit mode
        if (data) {
            let osReqs = data.os_reqs.split(',');
            this.projectName[0] = data.name;
            this.cat[0] = data.cat_id;
            this.basicDesc[0] = data.desc;
            this.fullDesc[0] = data.full_desc;
            this.techReqs[0] = data.tech_reqs;
            this.developerReqs[0] = data.dev_reqs;
            if (data.os_reqs) {
                for (let osReq of osReqs) {
                    this.osReqs.get(osReq).setValue(true);
                }
            }
        } else if (IS_FILL_DUMMY) {
            this.projectName[0] = 'Expensr';
            this.cat[0] = '1';
            this.basicDesc[0] = 'Searchable database of subscribers\n' +
                'Ability to search web-sites for specifics types of information\n' +
                'Creation of a results table based on rankings';
            this.fullDesc[0] = 'The app will track your expenses and tell your where exactly to ' +
                'cut and what kind of savings you can expect, among other things!';
            this.techReqs[0] = 'HTML5\nCSS3\nAngular 4\nWebpack 2\nES6';
            this.developerReqs[0] = 'Fluent English';
            this.osReqs.get('android').setValue(true);
        }
    }

    /**
     * Build a hash from an array that represents OSs in a checkbox UI
     * @param fb
     */
    private buildOsRequirements(fb) {
        let map = CONFIG.OS.reduce((mapTemp, os) => {
            mapTemp[os.key] = [''];
            return mapTemp;
        }, {});
        this.osReqs = fb.group(map);
    }
}

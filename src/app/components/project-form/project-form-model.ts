import {Validators, FormBuilder} from '@angular/forms';
import {CONFIG} from '../../consts/config';

/**
 * Development aid - replace false with true to have everything filled with dummy data (do not commit!)
 * @type {boolean}
 */
const IS_FILL_DUMMY = IS_DEV && false;

export class BuyerInfoModel {
  firstName = ['', Validators.required];
  lastName = ['', Validators.required];
  contactEmail = ['', [Validators.required, Validators.email]];
  contactPhone = ['', Validators.required];
  country = ['', Validators.required];
  city = ['', Validators.required];
  addressLine1 = ['', Validators.required];
  addressLine2 = [''];
  companyName = [''];
  companyPosition = [''];
  whatCompanyDoes = [''];

  constructor(data: any = null) {
    // Edit mode
    if (data) {
      this.firstName[0] = data.first_name;
      this.lastName[0] = data.last_name;
      this.contactEmail[0] = data.email;
      this.contactPhone[0] = data.phone;
      this.country[0] = data.country_id;
      this.city[0] = data.city;
      this.addressLine1[0] = data.addr1;
      this.addressLine2[0] = data.addr2;
      this.companyName[0] = data.company;
      this.companyPosition[0] = data.position;
      this.whatCompanyDoes[0] = data.comp_desc;
    }
    else if (IS_FILL_DUMMY) {
      this.firstName[0] = 'Georgy';
      this.lastName[0] = 'Kagan';
      this.contactEmail[0] = 'georgekagan@gmail.com';
      this.contactPhone[0] = '+972546253553';
      this.country[0] = '1';
      this.city[0] = 'Lod';
      this.addressLine1[0] = 'Hativat Harel 4/7';
      this.addressLine2[0] = 'Entrance B';
      this.companyName[0] = 'Expensr';
      this.companyPosition[0] = 'Lead Front-End Developer';
      this.whatCompanyDoes[0] = 'My product strives to make sense in the sea of monthly expenses that most of the people are in. ' +
        'I try to help make right decisions in the pursuit of more savings each month.'
    }
  }
}

export class ProjectInfoModel {
  projectName = ['', [Validators.required, Validators.minLength(4)]];
  cat = ['', Validators.required];
  basicDesc = ['', Validators.required];
  fullDesc = ['', Validators.required];
  techReqs = ['', Validators.required];
  developerReqs = ['', Validators.required];
  osReqs;

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
        for (let i = 0; i < osReqs.length; i++) {
          this.osReqs.get(osReqs[i]).setValue(true);
        }
      }
    }
    else if (IS_FILL_DUMMY) {
      this.projectName[0] = 'Expensr';
      this.cat[0] = '1';
      this.basicDesc[0] = 'Searchable database of subscribers\n' +
        'Ability to search web-sites for specifics types of information\n' +
        'Creation of a results table based on rankings';
      this.fullDesc[0] = 'The app will track your expenses and tell your where exactly to cut and what kind of savings you can expect, among other things!';
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
    let map = CONFIG.OS.reduce((map, os) => {
      map[os.key] = [''];
      return map;
    }, {});
    this.osReqs = fb.group(map);
  }
}

export class DesignModel {
  logoSlogan = [''];
  designIdeas = [''];
  designOutline = ['', Validators.required];

  constructor(data: any = null) {
    // Edit mode
    if (data) {
      this.designOutline[0] = data.design_outline;
    }
    else if (IS_FILL_DUMMY) {
      this.designOutline[0] = 'I want it to be pretty';
    }
  }
}


export class MilestonesModel {
  arr;
  startDate = ['', Validators.required];
  developerCount = [CONFIG.DEFAULTS.DEV_COUNT];

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
    }
    else if (IS_FILL_DUMMY) {
      this.buildMilestones(fb);
      this.arr.get([0, 'name']).setValue('Example milestone');
      this.arr.get([0, 'timespan']).setValue(2);
      this.arr.get([0, 'desc']).setValue('Full description of milestone');
    }
    else {
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

  /**
   * Return a milestone stub, used when user adds new ones
   * @returns {}
   */
  public static getMilestoneStub() {
    return {
      name: ['', Validators.required],
      timespan: [CONFIG.WIZARD.DEFAULT_TIMESPAN, [Validators.required, Validators.min(CONFIG.WIZARD.MIN_TIMESPAN), Validators.max(CONFIG.WIZARD.MAX_TIMESPAN)]],
      desc: ['', Validators.required]
    };
  }
}


export class FinalModel {
  constructor() {
  }
}

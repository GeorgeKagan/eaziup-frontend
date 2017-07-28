import {Validators, FormBuilder} from '@angular/forms';
import {CONFIG} from '../../consts/config';

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
  whatCompanyDoes = ['', Validators.required];

  constructor() {
    if (IS_DEV) {
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

  constructor() {
    let fb = new FormBuilder();

    this.buildOsRequirements(fb);

    if (IS_DEV) {
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

  constructor() {
    if (IS_DEV) {
      this.designOutline[0] = 'I want it to be pretty';
    }
  }
}


export class MilestonesModel {
  arr;
  startDate = ['', Validators.required];
  developerCount = [CONFIG.DEFAULTS.DEV_COUNT];

  constructor() {
    let fb = new FormBuilder();

    this.buildMilestones(fb);

    if (IS_DEV) {
      this.arr.get([0, 'name']).setValue('Example milestone');
      this.arr.get([0, 'timespan']).setValue(2);
      this.arr.get([0, 'desc']).setValue('Full description of milestone');
    }
  }

  /**
   * Build milestones array that can be added by the user
   * @param fb
   */
  private buildMilestones(fb) {
    this.arr = fb.array([
      fb.group(MilestonesModel.getMilestoneStub())
    ]);
  }

  /**
   * Return a milestone stub, used when user adds new ones
   * @returns {}
   */
  public static getMilestoneStub() {
    return {
      name: ['', Validators.required],
      timespan: [CONFIG.DEFAULT_TIMESPAN, [Validators.required, Validators.min(CONFIG.MIN_TIMESPAN), Validators.max(CONFIG.MAX_TIMESPAN)]],
      desc: ['', Validators.required]
    };
  }
}


export class FinalModel {

  constructor() {
    if (IS_DEV) {

    }
  }
}

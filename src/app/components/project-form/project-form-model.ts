import {Validators} from '@angular/forms';

export class BuyerInfo {
  firstName = ['', Validators.required];
  lastName = ['', Validators.required];
  contactEmail = ['', [Validators.required, Validators.email]];
  contactPhone = ['', Validators.required];
  country = ['', Validators.required];
  city = ['', Validators.required];
  addressLine1 = ['', Validators.required];
  addressLine2 = [''];
  addressLine3 = [''];
  companyName = [''];
  companyPosition = [''];
  whatCompanyDoes = ['', Validators.required];

  constructor() {
    if (IS_DEV) {
      this.firstName[0] = 'Georgy';
      this.lastName[0] = 'Kagan';
      this.contactEmail[0] = 'georgekagan@gmail.com';
      this.contactPhone[0] = '+972546253553';
      this.country[0] = 'Israel';
      this.city[0] = 'Lod';
      this.addressLine1[0] = 'Hativat Harel 4/7';
      this.addressLine2[0] = 'Entrance B';
      this.companyName[0] = 'Expensr';
      this.companyPosition[0] = 'Lead Front-End Developer';
      this.whatCompanyDoes[0] = 'My product strives to make sense in the sea of monthly expenses that most of the people are in. I try to help make right decisions in the pursuit of more savings each month.'
    }
  }
}

export class ProjectInfo {
  projectName = ['', [Validators.required, Validators.minLength(4)]];
  cat = ['', Validators.required];
  subCat = ['', Validators.required];

  constructor() {
    if (IS_DEV) {
      this.projectName[0] = 'Expensr';
      this.cat[0] = 'Software';
      this.subCat[0] = 'Web Application';
    }
  }
}

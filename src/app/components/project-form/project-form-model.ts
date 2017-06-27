import {Validators} from '@angular/forms';

export class BuyerInfo {
  companyName = [''];
  firstName = ['', Validators.required];
  lastName = ['', Validators.required];
  companyPosition = [''];
  contactEmail = ['', [Validators.required, Validators.email]];
  contactPhone = ['', Validators.required];
  country = ['', Validators.required];
  city = ['', Validators.required];
  addressLine1 = ['', Validators.required];
  addressLine2 = [''];
  addressLine3 = [''];
  whatCompanyDoes = ['', Validators.required];
}

export class ProjectInfo {
  projectName = ['', [Validators.required, Validators.minLength(4)]];
  // cat = ['', Validators.required];
  // subCat = ['', Validators.required];
}

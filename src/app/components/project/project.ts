import { Validators } from '@angular/forms';

export class BuyerInfo {
  companyName = [''];
  country = ['', Validators.required];
}

export class ProjectInfo {
  projectName = ['', [Validators.required, Validators.minLength(4)]];
  // cat = ['', Validators.required];
  // subCat = ['', Validators.required];
}

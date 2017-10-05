import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'choose-acc-type',
  templateUrl: 'choose-acc-type.component.html'
})
export class ChooseAccTypeComponent implements OnInit {
  constructor() {
  }

  public ngOnInit() {
  }

  public setAccTypeAsEntrepreneur() {
    //todo confirm modal
    //todo call auth0 api to set metadata acctype to ent
    //todo refresh page
  }

  public setAccTypeAsStudent() {
    //todo confirm modal
    //todo call auth0 api to set metadata acctype to stu
    //todo refresh page
  }
}

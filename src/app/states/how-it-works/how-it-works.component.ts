import {
  Component,
  OnInit
} from '@angular/core';
import {ICONS} from '../../consts/icons';

@Component({
  selector: 'how-it-works',
  templateUrl: 'how-it-works.component.html'
})
export class HowItWorksComponent implements OnInit {
  ICONS: object;
  
  constructor() {
    this.ICONS = ICONS;
  }

  public ngOnInit() {
  }
}

import {Component} from '@angular/core';
import {ICONS} from '../../consts/icons';

@Component({
  selector: 'how-it-works',
  templateUrl: 'how-it-works.component.html'
})
export class HowItWorksComponent {
  ICONS: object;

  constructor() {
    this.ICONS = ICONS;
  }
}
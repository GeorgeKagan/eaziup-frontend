import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'how-it-works',
  styles: [`
  `],
  template: `
    <h1>How The System Works</h1>
    <div>
      ...
    </div>
  `
})
export class HowItWorksComponent implements OnInit {

  public localState: any;
  constructor(
    public route: ActivatedRoute
  ) {}

  public ngOnInit() {
    this.route
      .data
      .subscribe((data: any) => {
        /**
         * Your resolved data from route.
         */
        this.localState = data.yourData;
      });

    console.log('hello `HowItWorks` component');
  }

}

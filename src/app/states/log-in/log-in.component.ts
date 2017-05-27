import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'log-in',
  styles: [`
  `],
  template: `
    <div class="container pb-5">
      <div class="col-sm-12">
        <h3 class="mb-4 text-success">Log In</h3>
        <div>
          ...
        </div>
      </div>
    </div>
  `
})
export class LogInComponent implements OnInit {

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

    console.log('hello `LogIn` component');
  }

}

import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'sign-up',
  styles: [`
  `],
  template: `
    <div class="container pb-5">
      <div class="col-sm-12">
        <h3 class="mb-4 text-success">Sign Up</h3>
        <div>
          ...
        </div>
      </div>
    </div>
  `
})
export class SignUpComponent implements OnInit {

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

    console.log('hello `SignUp` component');
  }

}

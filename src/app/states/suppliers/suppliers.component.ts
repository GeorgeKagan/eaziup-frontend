import {
  Component,
  OnInit
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'suppliers',
  styles: [`
  `],
  template: `
    <div class="container pb-5">
      <div class="col-sm-12">
        <h3 class="mb-4 text-success">Suppliers</h3>
        <div>
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tempor magna ac diam ultricies, a pretium urna blandit. 
          Aliquam et nisi ut risus interdum tempus. Ut ligula elit, consectetur a urna et, convallis commodo dolor. 
          Integer vel diam vel ex eleifend cursus sit amet quis orci. Suspendisse auctor vehicula placerat. 
          Pellentesque vel interdum ligula. Proin quis odio nulla. Proin id gravida ex. Maecenas aliquet metus mi, at porttitor risus ultrices ac. 
          Praesent rhoncus magna neque, non venenatis velit tincidunt quis. Maecenas id augue vitae odio maximus semper ut sit amet ex.
          </p>

          <p>
          Mauris vel tempor ipsum, rutrum euismod metus. Cras non neque et felis ultricies sagittis ut ut enim. 
          Aenean orci metus, tincidunt eget felis eu, accumsan dignissim ipsum. Nam a ex fermentum, ullamcorper libero in, aliquam nisl. Nam ut arcu purus. 
          Vestibulum et ligula cursus, dictum mauris sed, tempor enim. Donec semper nisl velit, quis rhoncus odio lobortis id. Vivamus ac semper nulla, quis scelerisque lorem.
          </p>
        </div>
      </div>
    </div>
  `
})
export class SuppliersComponent implements OnInit {

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

    console.log('hello `Suppliers` component');
  }

}

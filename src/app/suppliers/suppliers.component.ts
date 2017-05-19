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
    <h3 class="mb-4 text-success">Suppliers</h3>
    <div>
      ...
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

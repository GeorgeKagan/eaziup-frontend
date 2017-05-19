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
    <h3 class="mb-5 text-success">
      Projects / Sellers<br>
      <small class="text-muted">Add a new project or job</small>
    </h3>
    <project-form></project-form>
  `
})
export class ProjectsComponent implements OnInit {

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

    console.log('hello `Projects` component');
  }

}

import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  selector: 'new-project',
  template: `
    <div class="container pb-5">
      <div class="col-sm-12">
        <h3 class="mb-5 text-success">
          Add a new project<br>
          <small class="text-muted">Tell us what you need</small>
        </h3>
        <project-form></project-form>
      </div>
    </div>
  `
})
export class NewProjectComponent implements OnInit {
  constructor() {
  }

  public ngOnInit() {
  }
}

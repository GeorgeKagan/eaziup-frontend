import {Component} from '@angular/core';

@Component({
  selector: 'no-content',
  template: `
    <div class="container pt-5 pb-5">
      <div class="ml-auto mr-auto mt-5 text-center" style="width: 400px">
        <h1 class="display-4 pt-5 text-danger">
          404: not found!
        </h1>
        <p class="lead text-muted">Sorry about that...</p>
      </div>
    </div>
  `
})
export class NoContentComponent {

}

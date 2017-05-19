import { Component } from '@angular/core';

@Component({
  selector: 'no-content',
  template: `
    <div>
      <h1 class="display-4 text-danger">
        404: not found!
      </h1>
      <p class="lead text-muted">Sorry about that...</p>
    </div>
  `
})
export class NoContentComponent {

}

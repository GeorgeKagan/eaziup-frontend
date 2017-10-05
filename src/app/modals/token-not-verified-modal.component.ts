import {Component, Input} from '@angular/core';
import {CONFIG} from './consts/config';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Oops!</h4>
    </div>
    <div class="modal-body">
      <p>{{body}}</p>
    </div>
    <div class="modal-footer">
      <button type="button" role="button" class="btn btn-outline-dark" (click)="activeModal.close()">
        Close
      </button>
    </div>
  `
})
export class TokenNotVerifiedModalComponent {
  @Input() body;

  constructor(public activeModal: NgbActiveModal) {
  }
}

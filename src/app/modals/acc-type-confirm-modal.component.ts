import {Component, Input} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  template: `    
    <div class="modal-header">
      <h4 class="modal-title">Heads up!</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>
        Once account type is set, it cannot be undone!<br>
        Really set account type to <strong>{{accType}}</strong>?
      </p>
    </div>
    <div class="modal-footer">
      <button type="button" role="button" class="btn btn-success mr-auto" (click)="activeModal.close()">{{btnText}}</button>
      <button type="button" role="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Nope</button>
    </div>
  `
})
export class AccTypeConfirmModalComponent {
  @Input() accType;
  @Input() btnText;

  constructor(public activeModal: NgbActiveModal) {
  }
}

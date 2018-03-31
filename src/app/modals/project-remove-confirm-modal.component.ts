import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    template: `
        <div class="modal-header">
            <h4 class="modal-title">Heads up!</h4>
            <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss()">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            <p>Are you sure you want to remove the project?</p>
        </div>
        <div class="modal-footer">
            <button type="button" role="button" class="btn btn-danger mr-auto" (click)="activeModal.close()">Yes, remove</button>
            <button type="button" role="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Cancel</button>
        </div>
    `
})
export class ProjectRemoveConfirmModalComponent {
    constructor(public activeModal: NgbActiveModal) {
    }
}

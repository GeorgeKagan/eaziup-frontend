import {CONFIG} from './consts/config';
import {Component, Input} from "@angular/core";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

export function RestangularConfigFactory(RestangularProvider, modalService, authService) {
  RestangularProvider.setBaseUrl(API_URL);
  RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer ' + localStorage.getItem('idToken')});

  // Interceptor for all REST API calls
  RestangularProvider.addResponseInterceptor(data => {
    if (data.success !== false) {
      return data;
    }
    // If token expired or related - show modal and logout
    if (data.errorCode === CONFIG.ERRORS.TOKEN_NOT_VERIFIED) {
      const modalRef = modalService.open(TokenNotVerifiedModalComponent, {backdrop: 'static', keyboard: false});
      modalRef.result.then(() => {
        authService.doLogOut();
      });
      modalRef.componentInstance.body = data.errorMessage;
    }
    return [];
  });
}

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

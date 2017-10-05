import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccTypeConfirmModalComponent} from '../../modals/acc-type-confirm-modal.component';
import {AuthService} from '../../services/auth.service';
import {CONFIG} from '../../consts/config';
import {GlobalLoaderService} from '../../services/global-loader.service';

const DONE_SCREEN_TIMEOUT = 2000;

@Component({
  selector: 'choose-acc-type',
  templateUrl: 'choose-acc-type.component.html'
})
export class ChooseAccTypeComponent implements OnInit {
  isSubmitted: boolean = false;

  constructor(private modalService: NgbModal,
              private authService: AuthService,
              private globalLoader: GlobalLoaderService) {
  }

  public ngOnInit() {
  }

  /**
   * Set current user's account type to ent
   */
  public setAccTypeAsEntrepreneur() {
    this.confirmSelection('Entrepreneur', 'Yes, I want to submit a project!', {account_type: CONFIG.ENTREPRENEUR});
  }

  /**
   * Set current user's account type to stu
   */
  public setAccTypeAsStudent() {
    this.confirmSelection('Student', 'Yes, I want to work on a project!', {account_type: CONFIG.STUDENT});
  }

  /**
   * Show modal, on confirm - save Auth0 user metadata, show success page and reload page.
   * @param accType
   * @param btnText
   * @param userMetadata
   */
  private confirmSelection(accType, btnText, userMetadata) {
    let modalRef = this.modalService.open(AccTypeConfirmModalComponent);
    modalRef.componentInstance.btnText = btnText;
    modalRef.componentInstance.accType = accType;
    modalRef.result.then(() => {
      this.globalLoader.emitChange(true);
      this.authService.updateUserMetadata(userMetadata).then(() => {
        this.globalLoader.emitChange(false);
        this.isSubmitted = true;
        setTimeout(() => window.location.reload(), DONE_SCREEN_TIMEOUT);
      });
    }, () => {});
  }
}

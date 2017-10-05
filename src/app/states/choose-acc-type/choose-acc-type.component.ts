import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AccTypeConfirmModalComponent} from '../../modals/acc-type-confirm-modal.component';

@Component({
  selector: 'choose-acc-type',
  templateUrl: 'choose-acc-type.component.html'
})
export class ChooseAccTypeComponent implements OnInit {
  constructor(private modalService: NgbModal) {
  }

  public ngOnInit() {
  }

  public setAccTypeAsEntrepreneur() {
    this.confirmSelection('Entrepreneur', 'Yes, I want to submit a project!').then(() => {
      //todo call auth0 api to set metadata acctype to ent
      //todo refresh page
    }, () => {});
  }

  public setAccTypeAsStudent() {
    this.confirmSelection('Student', 'Yes, I want to work on a project!').then(() => {
      //todo call auth0 api to set metadata acctype to stu
      //todo refresh page
    }, () => {});
  }

  private confirmSelection(accType, btnText) {
    let modalRef = this.modalService.open(AccTypeConfirmModalComponent);
    modalRef.componentInstance.btnText = btnText;
    modalRef.componentInstance.accType = accType;
    return modalRef.result;
  }
}

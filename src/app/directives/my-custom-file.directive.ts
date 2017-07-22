import {Directive, ElementRef, HostListener, Input} from '@angular/core';

/**
 * Augment Bootstrap 4's file input
 */
@Directive({
  selector: '[my-custom-file]'
})
export class MyCustomFileDirective {
  constructor(private el: ElementRef) { }

  @HostListener('change') onChange() {
    if (!this.el.nativeElement.files.length) {
      return;
    }
    if (this.el.nativeElement.files.length > 1) {
      this.el.nativeElement.nextElementSibling.innerText = this.el.nativeElement.files.length + ' files selected';
    } else {
      this.el.nativeElement.nextElementSibling.innerText = this.el.nativeElement.files[0].name;
    }
    this.el.nativeElement.nextElementSibling.classList.add('ez-file-chosen');
  }
}

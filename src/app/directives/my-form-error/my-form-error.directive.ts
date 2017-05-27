import {
  Directive,
  ElementRef,
  Renderer
} from '@angular/core';
/**
 * Directive
 * Helper for displaying form errors
 */
@Directive({
  selector: 'my-form-error'
})
export class MyFormError {
  constructor(
    public element: ElementRef,
    public renderer: Renderer
  ) {
    /**
     * Simple DOM manipulation to set font size to my-form-error
     * `nativeElement` is the direct reference to the DOM element
     * element.nativeElement.style.fontSize = 'my-form-error';
     *
     * for server/webworker support use the renderer
     */
     renderer.setElementStyle(element.nativeElement, 'fontSize', 'x-large');
  }
}

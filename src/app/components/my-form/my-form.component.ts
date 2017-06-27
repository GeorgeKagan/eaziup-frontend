import {FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import {CONFIG} from '../../consts/config';

/**
 * Base form component
 */
export class MyFormComponent {
  fb: FormBuilder;
  myForm: FormGroup;
  submitted: boolean = false;
  formErrors: object = {};
  validationMessages: object = {};

  constructor() {
    this.fb = new FormBuilder();
  }

  /**
   * Init the form
   */
  public init(): void {
    this.buildForm();
  }

  /**
   * Build form and listen for input changes
   */
  protected buildForm(): void {
    this.myForm.valueChanges
      .subscribe(data => this.onValueChanged());

    this.onValueChanged(); // (re)set validation messages now
  }

  /**
   * Set form errors state map
   * @param errors
   */
  public setFormErrors(errors: object): void {
    this.formErrors = errors;
  }

  /**
   * Set form validation messages map
   * @param messages
   */
  public setValidationMessages(messages: object): void {
    this.validationMessages = messages;
  }

  /**
   * Called every time a form input changes
   * Clears errors and then sets any that are relevant
   */
  private onValueChanged(): void {
    if (!this.myForm) {
      return;
    }
    const form = this.myForm;

    for (const group in this.formErrors) {
      if (!this.formErrors.hasOwnProperty(group)) { break; }

      for (const field in this.formErrors[group]) {
        if (!this.formErrors[group].hasOwnProperty(field)) { break; }

        // Clear previous error message (if any)
        this.formErrors[group][field] = '';
        const control = form.get([group, field]);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[group][field];

          // If the control has errors, set for display as defined in validationMessages
          if (CONFIG.FORM.IS_SHOW_ONE_ERROR) {
            this.formErrors[group][field] = messages[Object.keys(control.errors)[0]] + ' ';
          } else {
            for (const key in control.errors) {
              if (!control.errors.hasOwnProperty(key)) { break; }
              this.formErrors[group][field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  /**
   * From submit handler
   * Marks all inputs and touched and dirty, so validations would show up
   */
  public onSubmit(): void {
    this.markAsTouchedAndDirty(this.myForm);
    this.onValueChanged();

    if (this.myForm.valid) {
      this.submitted = true;
    }
  }

  /**
   * Marks all inputs as touched and dirty, recursively
   * Used for showing validation messages when submit is clicked
   * @param group
   */
  private markAsTouchedAndDirty(group: FormGroup | FormArray): void {
    group.markAsTouched();
    group.markAsDirty();
    for (let i in group.controls) {
      if (!group.controls.hasOwnProperty(i)) {
        break;
      }
      if (group.controls[i] instanceof FormControl) {
        group.controls[i].markAsTouched();
        group.controls[i].markAsDirty();
      } else {
        this.markAsTouchedAndDirty(group.controls[i]);
      }
    }
  }

  /**
   * Check if a certain input has errors
   * @param inputName
   * @returns {any|boolean}
   */
  public gotError(inputName): boolean {
    let [group, name] = inputName.split('.');
    return this.formErrors[group][name] && this.myForm.get([group, name]).touched;
  }

  /**
   * get the form data
   * @returns {any}
   */
  public getPayload() {
    return this.myForm.value;
  }

  /**
   * Is the form valid?
   * @returns {boolean}
   */
  public isValid(): boolean {
    return this.myForm.valid;
  }

}

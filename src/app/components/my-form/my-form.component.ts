import {FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';

/**
 * Base form component
 */
export class MyFormComponent {
  fb: FormBuilder;
  myForm: FormGroup;
  submitted: boolean = false;
  formErrors = {};
  validationMessages = {};

  constructor() {
    this.fb = new FormBuilder();
  }

  /**
   * Build the form shortly after component creation
   */
  ngOnInit(): void {
    this.buildForm();
  }

  /**
   * Build form and listen for input changes
   */
  buildForm() {
    this.myForm.valueChanges
      .subscribe(data => this.onValueChanged());

    this.onValueChanged(); // (re)set validation messages now
  }

  /**
   * Set form errors state map
   * @param errors
   */
  setFormErrors(errors: object) {
    this.formErrors = errors;
  }

  /**
   * Set form validation messages map
   * @param messages
   */
  setValidationMessages(messages: object) {
    this.validationMessages = messages;
  }

  /**
   * Called every time a form input changes
   * Clears errors and then sets any that are relevant
   */
  onValueChanged() {
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
          for (const key in control.errors) {
            if (!control.errors.hasOwnProperty(key)) { break; }
            this.formErrors[group][field] += messages[key] + ' ';
          }
        }
      }
    }
  }

  /**
   * From submit handler
   * Marks all inputs and touched and dirty, so validations would show up
   */
  onSubmit() {
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
  markAsTouchedAndDirty(group: FormGroup | FormArray) {
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
  gotError(inputName) {
    let [group, name] = inputName.split('.');
    return this.formErrors[group][name] && this.myForm.get([group, name]).touched;
  }

  /**
   * get the form data
   * @returns {any}
   */
  getPayload() {
    return this.myForm.value;
  }

  /**
   * Is the form valid?
   * @returns {boolean}
   */
  isValid() {
    return this.myForm.valid;
  }

}

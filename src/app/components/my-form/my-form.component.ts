import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CONFIG } from '../../consts/config';

/**
 * Base form component
 */
export class MyFormComponent {
    public fb: FormBuilder;
    public myForm: FormGroup;
    public submitted: boolean = false;
    public formErrors: object = {};
    public validationMessages: object = {};

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
     * Check if a certain input has errors
     * @param inputName
     * @param index
     * @returns {any|boolean}
     */
    public gotError(inputName: string, index: any = null): boolean {
        if (index !== null) {
            let [group, arr, name] = inputName.split('.');
            return this.formErrors[group][arr][index][name] && this.myForm.get([group, arr, index, name]).touched;
        } else {
            let [group, name] = inputName.split('.');
            return this.formErrors[group][name] && this.myForm.get([group, name]).touched;
        }
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

    /**
     * Build form and listen for input changes
     */
    protected buildForm(): void {
        this.myForm.valueChanges
            .subscribe(() => this.onValueChanged());

        this.onValueChanged(); // (re)set validation messages now
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

        // Main group
        for (const group of Object.keys(this.formErrors)) {
            if (!this.formErrors.hasOwnProperty(group)) {
                break;
            }

            // Normal Field or Array
            for (const field of Object.keys(this.formErrors[group])) {
                if (!this.formErrors[group].hasOwnProperty(field)) {
                    break;
                }

                // Array Flow
                if (Array.isArray(this.formErrors[group][field])) {
                    this.buildErrorsForArray(form, group, field);
                } else { // Normal Field Flow
                    this.buildErrorsForField(form, group, field);
                }
            }
        }
    }

    /**
     * Build the error(s) for an array input group
     * @param form
     * @param group
     * @param arr
     */
    private buildErrorsForArray(form, group, arr) {
        for (let i = 0; i < this.formErrors[group][arr].length; i++) {
            for (const arrField of Object.keys(this.formErrors[group][arr][i])) {
                if (!this.formErrors[group][arr][i].hasOwnProperty(arrField)) {
                    break;
                }

                // Clear previous error message(s) (if any)
                this.formErrors[group][arr][i][arrField] = '';
                const control = form.get([group, arr, i, arrField]);

                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[group][arr][arrField];

                    // If the control has errors, set for display as defined in validationMessages
                    if (CONFIG.FORM.IS_SHOW_ONE_ERROR) {
                        this.formErrors[group][arr][i][arrField] = messages[Object.keys(control.errors)[0]] + ' ';
                    } else {
                        for (const key of Object.keys(control.errors)) {
                            if (!control.errors.hasOwnProperty(key)) {
                                break;
                            }
                            this.formErrors[group][arr][i][arrField] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }

    /**
     * Builds the error(s) for a single input field
     * @param form
     * @param group
     * @param field
     */
    private buildErrorsForField(form, group, field) {
        // Clear previous error message(s) (if any)
        this.formErrors[group][field] = '';
        const control = form.get([group, field]);

        if (control && control.dirty && !control.valid) {
            const messages = this.validationMessages[group][field];

            // If the control has errors, set for display as defined in validationMessages
            if (CONFIG.FORM.IS_SHOW_ONE_ERROR) {
                this.formErrors[group][field] = messages[Object.keys(control.errors)[0]] + ' ';
            } else {
                for (const key of Object.keys(control.errors)) {
                    if (!control.errors.hasOwnProperty(key)) {
                        break;
                    }
                    this.formErrors[group][field] += messages[key] + ' ';
                }
            }
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
        for (let i of Object.keys(group.controls)) {
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
}

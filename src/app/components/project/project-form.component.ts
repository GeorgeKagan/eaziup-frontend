import {Component} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, FormArray} from '@angular/forms';
import {trigger, style, animate, transition} from '@angular/animations';
import {countries} from '../../data-model';
import {BuyerInfo, ProjectInfo} from './project';
import {ProjectService} from '../../services/project/project.service';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html',
  providers: [
    ProjectService
  ],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({opacity: 0, 'max-height': 0, 'padding-top': 0, 'padding-bottom': 0, 'margin-top': 0, 'margin-bottom': 0, overflow: 'hidden'}),
        animate(350, style({opacity: 1, 'max-height': '*', 'padding-top': '*', 'padding-bottom': '*', 'margin-top': '*', 'margin-bottom': '*'}))
      ]),
      transition(':leave', [
        animate(350, style({opacity: 0, height: 0, 'padding-top': 0, 'padding-bottom': 0, 'margin-top': 0, 'margin-bottom': 0, overflow: 'hidden'}))
      ])
    ])
  ]
})
export class ProjectFormComponent {
  projectForm: FormGroup;
  countries = countries;
  submitted = false;

  formErrors = {
    'buyerInfo.companyName': '',
    'buyerInfo.country': '',
    'projectInfo.projectName': ''
  };
  validationMessages = {
    'buyerInfo.companyName': {
      'required': 'Company name is required.',
      'minlength': 'Company name must be at least 4 characters long.',
    },
    'buyerInfo.country': {
      'required': 'Country is required.'
    },
    'projectInfo.projectName': {
      'required': 'Project name is required.',
      'minlength': 'Project name must be at least 4 characters long.',
    }
  };

  constructor(private fb: FormBuilder,
              private projectService: ProjectService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.projectForm = this.fb.group({
      buyerInfo: this.fb.group(new BuyerInfo()),
      projectInfo: this.fb.group(new ProjectInfo())
    });

    this.projectForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.projectForm) {
      return;
    }
    const form = this.projectForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];

        for (const key in control.errors) {
          if (!control.errors.hasOwnProperty(key)) {
            break;
          }
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  onSubmit() {
    this.markAsTouchedAndDirty(this.projectForm);
    this.onValueChanged();

    if (this.projectForm.valid) {
      this.projectService.saveProject(this.projectForm.value);
      this.submitted = true;
    }
  }

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

  gotError(inputName) {
    return this.formErrors[inputName] && this.projectForm.get(inputName).touched;
  }
}

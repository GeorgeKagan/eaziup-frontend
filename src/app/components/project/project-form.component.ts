import { Component } from '@angular/core';
import { Project } from './project';

@Component({
  selector: 'project-form',
  templateUrl: './project-form.component.html'
})
export class ProjectFormComponent {
  model = new Project();

  submitted = false;

  onSubmit() { this.submitted = true; }

  get diagnostic() { return JSON.stringify(this.model); }
}

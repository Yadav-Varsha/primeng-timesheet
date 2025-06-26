import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectModalService} from '../service/project-modal.service';
import { Project } from '../models/project.model';
@Component({
  selector: 'app-project-modal',
  imports: [FormsModule,NgIf,NgClass],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent  {
constructor(
    public projectModalService: ProjectModalService,
   // ✅ Inject service
  ) {}

  newProject = {
    name: '',
    client: '',
    type: '',
    startDate: '',
    endDate: '',
    description: '',
    comment: ''
  };

// saveProject() {
//   const { name, client, type, startDate, endDate } = this.newProject;

//   if (!name || !client || !type || !startDate || !endDate) {
//     alert('Please fill all required fields: Project Name, Client, Type, Start Date, and End Date.');
//     return;
//   }

//   const existing = JSON.parse(localStorage.getItem('projects') || '[]');

//   const newEntry = {
//     ...this.newProject,
//     id: Date.now(),
//     tasks: []
//   };

//   existing.push(newEntry);
//   localStorage.setItem('projects', JSON.stringify(existing));

//   this.projectModalService.refresh(); // ✅ Trigger update to timesheet

//   this.close();
//   this.resetForm();
// }

saveProject(projectForm?: any) {
  if (projectForm && projectForm.invalid) {
    // Mark form as submitted to trigger validation errors
    return;
  }

  const { name, client, type, startDate, endDate } = this.newProject;

  if (!name || !client || !type || !startDate || !endDate) {
    alert('Please fill all required fields: Project Name, Client, Type, Start Date, and End Date.');
    return;
  }

  const existing = JSON.parse(localStorage.getItem('projects') || '[]');

  const newEntry = {
    ...this.newProject,
    id: Date.now(),
    tasks: []
  };

  existing.push(newEntry);
  localStorage.setItem('projects', JSON.stringify(existing));

  this.projectModalService.refresh();
  this.close();
  this.resetForm();
}


  close() {
    this.projectModalService.close();
  }

  resetForm() {
    this.newProject = {
      name: '',
      client: '',
      type: '',
      startDate: '',
      endDate: '',
      description: '',
      comment: ''
    };
  }
}


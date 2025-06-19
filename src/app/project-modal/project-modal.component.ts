import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectModalService} from '../service/project-modal.service';
import { Project } from '../models/project.model';
@Component({
  selector: 'app-project-modal',
  imports: [FormsModule,NgIf],
  templateUrl: './project-modal.component.html',
  styleUrl: './project-modal.component.css'
})
export class ProjectModalComponent  {
  constructor(public projectModalService: ProjectModalService) {}

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
  //   if (!this.newProject.name || !this.newProject.client) {
  //     alert('Please enter project name and client');
  //     return;
  //   }

  //   const projects = JSON.parse(localStorage.getItem('projects') || '[]');
  //   projects.push({
  //     ...this.newProject,
  //     id: Date.now(),
  //     tasks: []
  //   });

  //   localStorage.setItem('projects', JSON.stringify(projects));

  //   this.projectModalService.close(); // close the modal
  //   this.resetForm();                 // reset fields
  // }
  saveProject() {
  if (!this.newProject.name || !this.newProject.client) {
    alert('Project Name and Client are required');
    return;
  }

  const existing = JSON.parse(localStorage.getItem('projects') || '[]');

  const newEntry = {
    ...this.newProject,
    id: Date.now(), // optional
    tasks: []       // optional if you'll add tasks later
  };

  existing.push(newEntry);
  localStorage.setItem('projects', JSON.stringify(existing));

  this.close();     // ✅ Close the modal
  this.resetForm(); // ✅ Reset form fields
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


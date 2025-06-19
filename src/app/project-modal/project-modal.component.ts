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
export class ProjectModalComponent implements OnInit {
 showModal = false;
  projects: Project[] = [];

  newProject = {
    name: '',
    client: '',
    type: '',
    startDate: '',
    endDate: '',
    description: '',
    comment: ''
  };

  constructor(private projectModalService: ProjectModalService) {}

  ngOnInit(): void {
    this.projects = this.projectModalService.getProjects();
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.resetForm();
  }

  saveProject() {
    if (!this.newProject.name || !this.newProject.client) {
      alert('Project Name and Client are required');
      return;
    }

    this.projects = this.projectModalService.createProject(this.newProject);
    this.closeModal();
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


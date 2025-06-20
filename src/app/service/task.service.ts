import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 show = false;
  selectedProjectId: string = '';
  selectedProjectName: string = '';

  // Open modal with selected project
  open(projectId: string, projectName: string) {
    this.selectedProjectId = projectId;
    this.selectedProjectName = projectName;
    this.show = true;
  }

  close() {
    this.show = false;
  }

  // Save task under correct project in localStorage
  saveTask(task: any) {
    const allProjects = JSON.parse(localStorage.getItem('projects') || '[]');
    const project = allProjects.find((p: any) => p.id === this.selectedProjectId);

    if (project) {
      project.tasks = project.tasks || [];
      project.tasks.push(task);
      localStorage.setItem('projects', JSON.stringify(allProjects));
    }

    this.close();
  }
}

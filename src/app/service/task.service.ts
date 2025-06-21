import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../models/project.model';
import { TaskEntry } from '../models/task-entry.model';
import { ProjectModalService } from './project-modal.service'; // ✅ Import the service

@Injectable({
  providedIn: 'root'
})
export class TaskService {
 show = false;
  selectedProjectId: string = '';
  selectedProjectName: string = '';
 constructor(private projectModalService: ProjectModalService) {} // ✅

  // Open modal with selected project
  open(projectId: string, projectName: string) {
    this.selectedProjectId = projectId;
    this.selectedProjectName = projectName;
    this.show = true;
  }

  close() {
    this.show = false;
  }

  saveTask(task: TaskEntry) {

     const weekKey = localStorage.getItem('currentWeekStart');
  const weekStart = weekKey ? new Date(weekKey) : new Date();
  const storageKey = `weeklyTimesheet-${weekStart.getFullYear()}-${weekStart.getMonth()+1}-${weekStart.getDate()}`;

    const allProjects: Project[] = JSON.parse(localStorage.getItem('projects') || '[]');
    
    // Convert selectedProjectId to number for comparison
    const project = allProjects.find((p: Project) => p.id.toString() === this.selectedProjectId.toString());

    if (project) {
      project.tasks = project.tasks || [];
      project.tasks.push(task); // ✅ Push with hours & billable
      localStorage.setItem('projects', JSON.stringify(allProjects));

      this.projectModalService.refresh(); // ✅ Tell UI to reload
    }

    this.close();
  }

  saveTaskHours(projectId: string, tasks: TaskEntry[]) {
  // Sabhi projects fetch karo
  const allProjects: Project[] = JSON.parse(localStorage.getItem('projects') || '[]');
  // Sahi project dhoondo
  const project = allProjects.find((p: Project) => p.id.toString() === projectId.toString());
  if (project) {
    project.tasks = tasks;
    localStorage.setItem('projects', JSON.stringify(allProjects));
  }
}
}

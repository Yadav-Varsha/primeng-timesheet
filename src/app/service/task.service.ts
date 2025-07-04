import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Project } from '../models/project.model';
import { TaskEntry } from '../models/task-entry.model';
import { ProjectModalService } from './project-modal.service'; // ✅ Import the service
import { startOfWeek } from 'date-fns';

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

  // Save task hours for a specific week
  saveTaskHours(projectId: string, tasks: TaskEntry[], weekDate: Date) {
    const weekStart = startOfWeek(weekDate, { weekStartsOn: 1 });
    const key = `weeklyTimesheet-${weekStart.getFullYear()}-${weekStart.getMonth() + 1}-${weekStart.getDate()}`;
    const allProjects: Project[] = JSON.parse(localStorage.getItem(key) || '[]');
    const project = allProjects.find((p: Project) => p.id.toString() === projectId.toString());
    if (project) {
      project.tasks = tasks;
      localStorage.setItem(key, JSON.stringify(allProjects));
    }
  }
}

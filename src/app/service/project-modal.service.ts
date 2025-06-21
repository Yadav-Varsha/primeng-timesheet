import { Injectable } from '@angular/core';
import { Project, } from '../models/project.model'; // ✅ import from model
import { TaskEntry } from '../models/task-entry.model'; // ✅ import TaskEntry model
import { BehaviorSubject } from 'rxjs'; // ✅ import BehaviorSubject for state management
@Injectable({
  providedIn: 'root'
})
export class ProjectModalService {
 show = false;
   private projectsSubject = new BehaviorSubject<any[]>(this.getProjectsFromStorage());
  projects$ = this.projectsSubject.asObservable();

  // Read projects from localStorage
  private getProjectsFromStorage(): Project[] {
    const stored = localStorage.getItem('projects');
    const projects: Project[] = stored ? JSON.parse(stored) : [];

    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    projects.forEach((project: Project) => {
      project.tasks = project.tasks || [];
      project.tasks.forEach((task: TaskEntry) => {
        task.hours ||= {};
        days.forEach(day => {
          task.hours[day] ||= 0; // Use 0 for number type
        });
      });
    });

    return projects;
  }


  // Add project and notify subscribers
  addProject(project: any): void {
    const current = this.getProjectsFromStorage();
    current.push(project);
    localStorage.setItem('projects', JSON.stringify(current));
    this.projectsSubject.next(current); // 🔄 trigger update
  }

  // Optional: reload from localStorage
  refresh(): void {
    this.projectsSubject.next(this.getProjectsFromStorage());
  }


  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }
}

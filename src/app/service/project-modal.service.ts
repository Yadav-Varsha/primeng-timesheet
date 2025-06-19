import { Injectable } from '@angular/core';
import { Project, } from '../models/project.model'; // ✅ import from model
import { TaskEntry } from '../models/task-entry.model'; // ✅ import TaskEntry model
@Injectable({
  providedIn: 'root'
})
export class ProjectModalService {
 private storageKey = 'projects';

  constructor() {}

  getProjects(): Project[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveProjects(projects: Project[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(projects));
  }

  createProject(projectData: Omit<Project, 'id' | 'tasks'>): Project[] {
    const projects = this.getProjects();
    const newProject: Project = {
      ...projectData,
      id: Date.now(),
      tasks: []
    };
    projects.push(newProject);
    this.saveProjects(projects);
    return projects;
  }

  addTaskToProject(projectId: number, task: TaskEntry): void {
    const projects = this.getProjects();
    const project = projects.find(p => p.id === projectId);
    if (project) {
      project.tasks.push(task);
      this.saveProjects(projects);
    }
  }

  getProjectById(id: number): Project | undefined {
    return this.getProjects().find(p => p.id === id);
  }
}

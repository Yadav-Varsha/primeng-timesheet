import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  constructor() { }
    private storageKey = 'timesheetData';

  getProjects(): Project[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveProjects(projects: Project[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(projects));
  }
}

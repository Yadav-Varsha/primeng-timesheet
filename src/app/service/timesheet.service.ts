import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

 constructor() { }
  private storageKey = 'weeklyTimesheet';
 private weekKey = 'currentWeekStart';
  getProjects(): Project[] {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : [];
  }

  saveProjects(projects: Project[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(projects));
  }

   getCurrentWeekStart(): Date {
    const saved = localStorage.getItem(this.weekKey);
    return saved ? new Date(saved) : new Date();
  }

  setCurrentWeekStart(date: Date): void {
    localStorage.setItem(this.weekKey, date.toISOString());
  }
}

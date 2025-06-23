import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { startOfWeek } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

 constructor() { }
   private storageKey = 'projects'; // CHANGED: Use 'projects' for global structure
 private weekKey = 'currentWeekStart';
   // Helper to get a unique key for each week
  getWeekKey(date: Date): string {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
   return `weeklyHours-${weekStart.getFullYear()}-${weekStart.getMonth() + 1}-${weekStart.getDate()}`;
  }

   // Get all projects (structure is global)
  getProjects(): Project[] {
    const data = localStorage.getItem('projects');
    return data ? JSON.parse(data) : [];
  }
 // Save all projects (structure is global)
  saveProjects(projects: Project[]): void {
    localStorage.setItem('projects', JSON.stringify(projects));
  }

 // Get hours for all tasks for a specific week
  getWeeklyHours(date: Date): { [taskId: number]: { hours: { [day: string]: number }, billable?: boolean } } {
    const key = this.getWeekKey(date);
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  }

   // Save hours for all tasks for a specific week
  saveWeeklyHours(date: Date, weeklyHours: { [taskId: number]: { hours: { [day: string]: number }, billable?: boolean } }) {
    const key = this.getWeekKey(date);
    localStorage.setItem(key, JSON.stringify(weeklyHours));
  }

  getCurrentWeekStart(): Date {
    const saved = localStorage.getItem(this.weekKey);
    return saved ? new Date(saved) : new Date();
  }

  setCurrentWeekStart(date: Date): void {
    localStorage.setItem(this.weekKey, date.toISOString());
  }
}

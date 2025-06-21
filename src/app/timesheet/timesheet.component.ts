import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../models/project.model';
import { TaskEntry } from '../models/task-entry.model';
import { TimesheetService } from '../service/timesheet.service';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../service/task.service';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { NgFor, NgForOf, NgIf } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CalendarModule } from 'primeng/calendar';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ProjectModalService } from '../service/project-modal.service';
import { ProjectModalComponent } from '../project-modal/project-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { addDays, startOfWeek, format } from 'date-fns';



@Component({
  selector: 'app-timesheet',
  imports: [FormsModule,
    TableModule,
    InputTextModule,
    ToggleButtonModule,
    ButtonModule, SplitButtonModule, CalendarModule, ButtonGroupModule, ButtonModule, InputNumberModule, InputSwitchModule, TableModule, NgIf, NgFor, NgForOf, CommonModule, ],
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit  {
 projects: any[] = [];
// In your TimesheetComponent class
editRow: any = null;
editCol: string | null = null;
 weekDays: { label: string; date: string }[] = [];
currentWeekStart: Date = new Date();
weekStart: Date = new Date();
weekEnd: Date = new Date();

  constructor(private projectModalService: ProjectModalService, private taskService: TaskService, private timesheetService: TimesheetService) {}

ngOnInit(): void {
  this.currentWeekStart = this.timesheetService.getCurrentWeekStart();
  this.setWeekDays(this.currentWeekStart);
  this.setWeekRange(this.currentWeekStart); // <-- add this line
  // Load projects from localStorage
  this.projects = this.timesheetService.getProjects();

  // If you want to listen to projectModalService.projects$ as well:
  this.projectModalService.projects$.subscribe(data => {
    this.projects = data;
    this.save(); // Save to localStorage when projects change
  });
}

setWeekRange(date: Date) {
  this.weekStart = startOfWeek(date, { weekStartsOn: 1 }); // Monday
  this.weekEnd = addDays(this.weekStart, 6); // Sunday
}
getProjectDayTotal(project: any, dayLabel: string): number {
  let total = 0;
  for (const task of project.tasks) {
    total += Number(task.hours?.[dayLabel] || 0);
  }
  return total;
}
formatHour(value: number | undefined): string {
  const v = Number(value) || 0;
  const hours = Math.floor(v);
  const minutes = Math.round((v - hours) * 60);
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}
    // In your TimesheetComponent
setWeekDays(startDate: Date) {
  const days = [];
  const weekStart = startOfWeek(startDate, { weekStartsOn: 1 }); // Monday
  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStart, i);
    days.push({
      label: format(date, 'EEE'),      // 'Mon'
      date: format(date, 'MMM dd')     // 'Jun 16'
    });
  }
  this.weekDays = days;
  this.timesheetService.setCurrentWeekStart(weekStart);
}

  prevWeek() {
    this.currentWeekStart = addDays(this.currentWeekStart, -7);
    this.setWeekDays(this.currentWeekStart);
     this.setWeekRange(this.currentWeekStart); // <-- add this line
  }

  nextWeek() {
    this.currentWeekStart = addDays(this.currentWeekStart, 7);
    this.setWeekDays(this.currentWeekStart);
      this.setWeekRange(this.currentWeekStart); // <-- add this line
  }

   openModal() {
   this.projectModalService.open();
  }
   expandedRows: { [key: string]: boolean } = {};

  addTask(project: any) {
    // Add your logic to open a modal or add a task
    alert('Add Task for ' + project.name);
  }

openTask(project: any) {
  this.taskService.open(project.id, project.name);
}



getTaskTotal(task: any): number {
  return this.weekDays
    .map(day => Number(task.hours?.[day.label] || 0))   // CORRECT
    .reduce((a, b) => a + b, 0);
}


getDayTotal(dayLabel: string): number {
  let total = 0;
  for (const project of this.projects) {
    for (const task of project.tasks) {
      total += Number(task.hours?.[dayLabel] || 0);    // CORRECT
    }
  }
  return total;
}

getGrandTotal(): number {
  let total = 0;
  for (const project of this.projects) {
    for (const task of project.tasks) {
      total += this.getTaskTotal(task);
    }
  }
  return total;
}

save(): void {
  this.timesheetService.saveProjects(this.projects);
}
// ...existing code...
onHourChange(projectId: string, tasks: any[]) {
  this.taskService.saveTaskHours(projectId, tasks);
}
// ...existing code...



}
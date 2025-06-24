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
 todayLabel = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
// In your TimesheetComponent class
editRow: any = null;
editCol: string | null = null;
 weekDays: { label: string; date: string }[] = [];
currentWeekStart: Date = new Date();
weekStart: Date = new Date();
weekEnd: Date = new Date();
todayIndex: number = -1;
 weeklyHours: { [taskId: number]: { hours: { [day: string]: number }, billable?: boolean } } = {};
  constructor(private projectModalService: ProjectModalService, private taskService: TaskService, private timesheetService: TimesheetService) {}

 ngOnInit(): void {
    this.currentWeekStart = this.timesheetService.getCurrentWeekStart();
    this.setWeekDays(this.currentWeekStart);
    this.setWeekRange(this.currentWeekStart);
    this.loadProjectsAndHours();
    this.setTodayIndex();
    this.projectModalService.projects$.subscribe(data => {
      this.projects = data;
        this.ensureTaskIds(); // Ensure IDs after loading
      this.save();
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
      label: format(date, 'EEE'),            // e.g., 'Mon'
      date: format(date, 'yyyy-MM-dd')       // ✅ full ISO date: "2025-06-24"
    });
  }
  this.weekDays = days;
  this.timesheetService.setCurrentWeekStart(weekStart);
}


   prevWeek() {
    this.currentWeekStart = addDays(this.currentWeekStart, -7);
    this.setWeekDays(this.currentWeekStart);
    this.setWeekRange(this.currentWeekStart);
    this.loadProjectsAndHours();
  }

   nextWeek() {
    this.currentWeekStart = addDays(this.currentWeekStart, 7);
    this.setWeekDays(this.currentWeekStart);
    this.setWeekRange(this.currentWeekStart);
    this.loadProjectsAndHours();
  }

    loadProjectsAndHours() {
    this.projects = this.timesheetService.getProjects();
    this.ensureTaskIds(); // Har task ka unique id hona chahiye
    this.weeklyHours = this.timesheetService.getWeeklyHours(this.currentWeekStart);

    // Yaha change: Har task me us week ke hours merge karo
     for (const project of this.projects) {
    for (const task of project.tasks) {
      const wh = this.weeklyHours[task.id];
      if (wh && wh.hours) {
        task.hours = { ...wh.hours }; // <-- Yaha change: sirf tabhi assign karo jab data ho
      }
      // Billable bhi isi tarah
      if (wh && wh.billable !== undefined) {
        task.billable = wh.billable;
      }
    }
  }
  }


  
  // Ensure every task has a unique, persistent id
  ensureTaskIds() {
    let changed = false;
    for (const project of this.projects) {
      for (const task of project.tasks) {
        if (!task.id) {
          task.id = Date.now() + Math.floor(Math.random() * 1000000);
          changed = true;
        }
      }
    }
    if (changed) this.save();
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
    .map(day => this.weeklyHours[task.id]?.hours?.[day.label] ?? 0)
    .reduce((a, b) => a + b, 0);
}

getDayTotal(dayLabel: string): number {
  let total = 0;
  for (const project of this.projects) {
    for (const task of project.tasks) {
      // Yaha sirf weeklyHours object se value lo, task.hours se nahi!
      total += Number(this.weeklyHours[task.id]?.hours?.[dayLabel] ?? 0);
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
  onHourChange(task: TaskEntry) {
    this.weeklyHours[task.id] = this.weeklyHours[task.id] || { hours: {} };
    this.weeklyHours[task.id].hours = { ...task.hours };
    this.timesheetService.saveWeeklyHours(this.currentWeekStart, this.weeklyHours);
  }

    onBillableToggle(task: TaskEntry) {
    this.weeklyHours[task.id] = this.weeklyHours[task.id] || { hours: {} };
    this.weeklyHours[task.id].billable = task.billable;
    this.timesheetService.saveWeeklyHours(this.currentWeekStart, this.weeklyHours);
  }

  getWeeklyHour(taskId: number, day: string): number {
  // Agar weeklyHours object me value hai to wahi dikhao, warna 0 dikhao
  return this.weeklyHours[taskId]?.hours?.[day] ?? 0;
}

setWeeklyHour(task: any, day: string, value: number) {
  // Agar weeklyHours object me entry nahi hai to banao
  if (!this.weeklyHours[task.id]) {
    this.weeklyHours[task.id] = { hours: {} };
  }
  this.weeklyHours[task.id].hours[day] = value;
  this.timesheetService.saveWeeklyHours(this.currentWeekStart, this.weeklyHours);
}



setTodayIndex(): void {
  const today = new Date();
  this.todayIndex = this.weekDays.findIndex(day => {
    const date = new Date(day.date);
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  });
   console.log("TodayIndex:", this.todayIndex);
  console.log("Dates in weekDays:", this.weekDays.map(d => d.date));
  console.log("Today's Date:", today.toDateString());
}

}


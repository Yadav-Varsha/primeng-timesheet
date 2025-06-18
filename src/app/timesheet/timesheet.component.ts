import { Component, OnInit } from '@angular/core';
import { Project } from '../models/project.model';
import { TaskEntry } from '../models/task-entry.model';
import { TimesheetService } from '../service/timesheet.service';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { NgFor } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { CalendarModule } from 'primeng/calendar';
import { ButtonGroupModule } from 'primeng/buttongroup';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputSwitchModule } from 'primeng/inputswitch';







@Component({
  selector: 'app-timesheet',
  imports: [FormsModule,
    TableModule,
    InputTextModule,
    ToggleButtonModule,
    ButtonModule, SplitButtonModule, CalendarModule, ButtonGroupModule, ButtonModule, InputNumberModule, InputSwitchModule, NgFor, TableModule],
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  projects: Project[] = [];
  weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(private timesheetService: TimesheetService) { }

  ngOnInit(): void {
    this.projects = this.timesheetService.getProjects();
  }

  addTask(project: Project): void {
  const newTask: TaskEntry = {
    id: Date.now(), // or project.tasks.length + 1
    description: '',
    billable: false,
    hours: this.initializeHours()
  };
  project.tasks.push(newTask);
  this.save();
}


  initializeHours(): { [key: string]: number } {
    const hours: { [key: string]: number } = {};
    this.weekDays.forEach(day => (hours[day] = 0));
    return hours;
  }

  getTotal(day: string): number {
    return this.projects.reduce((sum, p) =>
      sum + p.tasks.reduce((s, t) => s + (t.hours[day] || 0), 0), 0);
  }

  save(): void {
    this.timesheetService.saveProjects(this.projects);
  }
}

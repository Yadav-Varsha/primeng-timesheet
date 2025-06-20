import { Component, OnInit, ViewChild } from '@angular/core';
import { Project } from '../models/project.model';
import { TaskEntry } from '../models/task-entry.model';
import { TimesheetService } from '../service/timesheet.service';
import { FormsModule } from '@angular/forms';

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
import { Checkbox } from 'primeng/checkbox';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-timesheet',
  imports: [FormsModule,
    TableModule,
    InputTextModule,
    ToggleButtonModule,
    ButtonModule, SplitButtonModule, CalendarModule, ButtonGroupModule, ButtonModule, InputNumberModule, InputSwitchModule, TableModule, NgIf, NgFor, NgForOf,Checkbox],
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit  {
 projects: any[] = [];

  constructor(private projectModalService: ProjectModalService, private taskService: TaskService) {}

  ngOnInit(): void {
    // Subscribe and assign once
    this.projectModalService.projects$.subscribe(data => {
      this.projects = data;
    });
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
// export class TimesheetComponent {
//   constructor(public projectModalService: ProjectModalService) {}

//   openModal() {
//     this.projectModalService.open();
//   }
   
//   projects: Project[] = [];
//   weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

//   constructor(private timesheetService: TimesheetService) { }

//   ngOnInit(): void {
//     this.projects = this.timesheetService.getProjects();
//   }

//   addTask(project: Project): void {
//   const newTask: TaskEntry = {
//     id: Date.now(), // or project.tasks.length + 1
//     description: '',
//     billable: false,
//     hours: this.initializeHours()
//   };
//   project.tasks.push(newTask);
//   this.save();
// }


//   initializeHours(): { [key: string]: number } {
//     const hours: { [key: string]: number } = {};
//     this.weekDays.forEach(day => (hours[day] = 0));
//     return hours;
//   }

//   getTotal(day: string): number {
//     return this.projects.reduce((sum, p) =>
//       sum + p.tasks.reduce((s, t) => s + (t.hours[day] || 0), 0), 0);
//   }

//   save(): void {
//     this.timesheetService.saveProjects(this.projects);
//   }
  // projects = [
  //   {
  //     id: 1,
  //     name: 'Internship Feb...',
  //     tasks: [
  //       {
  //         id: 1,
  //         name: 'Task 1',
  //         description: 'Initial setup',
  //         billable: true,
  //         hours: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 },
  //         status: 'Open'
  //       }
  //     ]
  //   }
  // ];

  // days = [
  //   { label: 'Mon', date: 'Jun 16' },
  //   { label: 'Tue', date: 'Jun 17' },
  //   { label: 'Wed', date: 'Jun 18' },
  //   { label: 'Thu', date: 'Jun 19' },
  //   { label: 'Fri', date: 'Jun 20' },
  //   { label: 'Sat', date: 'Jun 21' },
  //   { label: 'Sun', date: 'Jun 22' }
  // ];

  // expandedRows: { [key: string]: boolean } = {};

  // addTask(project: any) {
  //   // Add your logic to open a modal or add a task
  //   alert('Add Task for ' + project.name);
  // }

}
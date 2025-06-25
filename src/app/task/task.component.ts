import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { TaskService } from '../service/task.service';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { NgIf } from '@angular/common';
import { TimesheetService } from '../service/timesheet.service';
import { TaskEntry } from '../models/task-entry.model';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-task',
  imports: [DropdownModule, ReactiveFormsModule, DialogModule,FormsModule,NgIf,NgClass],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  newTask: any = {
    name: '',
    description: '',
    status: '',
    billable: '',
    comment: ''
  };
currentWeekStart: Date = new Date
taskForm: any;

  constructor(public taskService: TaskService, private timesheetService: TimesheetService) {}

  // Close modal
  close() {
    this.taskService.close();
  }

  // Save task with attached project info
saveTask() {
  const { name, category, billable, status } = this.newTask;

  // Validation: Check required fields
  if (!name || !category || !billable || !status) {
    alert('Please fill all required fields: Task Name, Category, Billability, and Status.');
    return;
  }

  const task = {
    id: Date.now() + Math.floor(Math.random() * 1000000), // Unique ID
    ...this.newTask,
    billable: this.newTask.billable === 'true' || this.newTask.billable === true,
    projectId: this.taskService.selectedProjectId,
    projectName: this.taskService.selectedProjectName,
    hours: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }
  };

  this.taskService.saveTask(task); // Calls TaskService

  // Reset form
  this.newTask = {
    name: '',
    description: '',
    status: '',
    billable: '',
    category: '',
    comment: ''
  };
}


  get projectName() {
    return this.taskService.selectedProjectName;
  }

   onHourChange(projectId: string, tasks: TaskEntry[]) {
    this.taskService.saveTaskHours(projectId, tasks, this.currentWeekStart);
  }

  taskCategories = [
  { label: 'Design', value: 'Design' },
  { label: 'Development', value: 'Development' },
  { label: 'Testing', value: 'Testing' }
];

}
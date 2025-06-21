import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { TaskService } from '../service/task.service';
import { DropdownModule } from 'primeng/dropdown';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-task',
  imports: [DropdownModule, ReactiveFormsModule, DialogModule,FormsModule,NgIf],
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

  constructor(public taskService: TaskService) {}

  // Close modal
  close() {
    this.taskService.close();
  }

  // Save task with attached project info
saveTask() {
  const task = {
    ...this.newTask,
    billable: this.newTask.billable === 'true' || this.newTask.billable === true, // ✅ Fix
    projectId: this.taskService.selectedProjectId,
    projectName: this.taskService.selectedProjectName,
    hours: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 } // ✅ Default hours
  };

  this.taskService.saveTask(task); // Calls TaskService
  this.newTask = {
    name: '',
    description: '',
    status: '',
    billable: '',
    comment: ''
  };
}


  get projectName() {
    return this.taskService.selectedProjectName;
  }
  // ...existing code...
onHourChange(projectId: string, tasks: any[]) {
  this.taskService.saveTaskHours(projectId, tasks);
}
// ...existing code...
}
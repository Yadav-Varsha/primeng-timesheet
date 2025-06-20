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
      projectId: this.taskService.selectedProjectId,
      projectName: this.taskService.selectedProjectName
    };

    this.taskService.saveTask(task);

    // Reset form after saving
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
}
import { Component,inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { ToggleButtonModule } from 'primeng/togglebutton';


@Component({
  selector: 'app-timesheet',
  imports: [ CommonModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    InputNumberModule,
    ButtonModule,
    ToggleButtonModule],
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.css'
})
export class TimesheetComponent {
 private http = inject(HttpClient);

  projectName = '';
  tasks: any[] = [
    this.createEmptyTask()
  ];

  days: string[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  createEmptyTask() {
    return {
      description: '',
      isBillable: false,
      monday: 0,
      tuesday: 0,
      wednesday: 0,
      thursday: 0,
      friday: 0,
      saturday: 0,
      sunday: 0
    };
  }

  addTask() {
    this.tasks.push(this.createEmptyTask());
  }

  submitTimesheet() {
    const project = {
      name: this.projectName,
      tasks: this.tasks
    };

    this.http.post('http://localhost:27098/api/Projects', project)
      .subscribe({
        next: (res) => alert('Timesheet Submitted Successfully!'),
        error: (err) => alert('Error: ' + err.error?.message || err.statusText)
      });
  }
}
                            
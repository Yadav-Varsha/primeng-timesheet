import { Component,OnInit} from '@angular/core';
import { Project } from '../models/project.model';
import { TaskEntry } from '../models/task-entry.model';
import { TimesheetService } from '../service/timesheet.service';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { ButtonModule } from 'primeng/button';
import { NgFor } from '@angular/common';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

@Component({
  selector: 'app-timesheet',
  imports: [FormsModule,
    TableModule,
    InputTextModule,
    ToggleButtonModule,
    ButtonModule,NgFor ],
 templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  projects: Project[] = [];
  days = DAYS;
  globalFilter = '';
  totalHours = 0;

  constructor(private timesheetService: TimesheetService) {}

  ngOnInit() {
    this.projects = this.timesheetService.getProjects();
    if (this.projects.length === 0) {
      // Seed with a sample project/task
      this.projects = [{
        id: 1,
        name: 'Sample Project',
        tasks: [{
          id: 1,
          description: 'Initial Task',
          billable: true,
          hours: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }
        }]
      }];
      this.save();
    }
    this.calculateTotal();
  }

  addTask(project: Project) {
    const newTask: TaskEntry = {
      id: Date.now(),
      description: '',
      billable: false,
      hours: { Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0, Sun: 0 }
    };
    project.tasks.push(newTask);
    this.save();
  }

  onHourChange() {
    this.save();
    this.calculateTotal();
  }

  toggleBillable(task: TaskEntry) {
    task.billable = !task.billable;
    this.save();
  }

  calculateTotal() {
    this.totalHours = this.projects
      .flatMap(p => p.tasks)
      .reduce((sum, t) => sum + this.days.reduce((dSum, d) => dSum + (+t.hours[d] || 0), 0), 0);
  }

  save() {
    this.timesheetService.saveProjects(this.projects);
  }

  submit() {
    alert('Timesheet submitted!\nTotal Hours: ' + this.totalHours);
    // Optionally clear or lock the timesheet
  }

  filterTasks(tasks: TaskEntry[]): TaskEntry[] {
    if (!this.globalFilter) return tasks;
    const filter = this.globalFilter.toLowerCase();
    return tasks.filter(t =>
      t.description.toLowerCase().includes(filter)
    );
  }
}
                            
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonDemoComponent } from './button-demo/button-demo.component';
import { TopbarComponent } from "./topbar/topbar.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { TimesheetComponent } from './timesheet/timesheet.component';
import { ProjectModalComponent } from './project-modal/project-modal.component';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopbarComponent, SidebarComponent, TimesheetComponent, ProjectModalComponent,TaskComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'primeng-timesheet';
}

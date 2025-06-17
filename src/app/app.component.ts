import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonDemoComponent } from './button-demo/button-demo.component';
import { TopbarComponent } from "./topbar/topbar.component";
import { SidebarComponent } from './sidebar/sidebar.component';
import { TimesheetComponent } from './timesheet/timesheet.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonDemoComponent, TopbarComponent, SidebarComponent, TimesheetComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'primeng-timesheet';
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
menu = [
  { label: 'Dashboard', icon: 'pi pi-home', path: '/dashboard' },
  { label: 'Projects', icon: 'pi pi-folder-open', path: '/projects' },
  { label: 'Activity', icon: 'pi pi-briefcase', path: '/activity' },
  { label: 'Time Tracking', icon: 'pi pi-stopwatch', path: '/time-tracking' },
  { label: 'Timesheet', icon: 'pi pi-calendar-clock', path: '/timesheet' }
];

 sidebarOpen = true;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
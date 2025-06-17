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
    { label: 'Timesheet', icon: 'pi pi-clock', path: '/timesheet' },
    { label: 'Calendar', icon: 'pi pi-calendar', path: '/calendar' },
    { label: 'Settings', icon: 'pi pi-cog', path: '/settings' }
  ];
}

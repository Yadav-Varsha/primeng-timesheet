import { NgIf } from '@angular/common';
import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [NgIf],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.css'
})
export class TopbarComponent {
showTopbarMenu = false;
toggleTopbarMenu(event: MouseEvent) {
  event.stopPropagation();
  this.showTopbarMenu = !this.showTopbarMenu;
}


// Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.showTopbarMenu = false;
  }
}

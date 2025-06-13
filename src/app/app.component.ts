import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonDemoComponent } from './button-demo/button-demo.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'primeng-timesheet';
}

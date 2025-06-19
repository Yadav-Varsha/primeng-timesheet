import { Injectable } from '@angular/core';
import { Project, } from '../models/project.model'; // ✅ import from model
import { TaskEntry } from '../models/task-entry.model'; // ✅ import TaskEntry model
@Injectable({
  providedIn: 'root'
})
export class ProjectModalService {
 show = false;

  open() {
    this.show = true;
  }

  close() {
    this.show = false;
  }
}

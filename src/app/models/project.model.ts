import { TaskEntry } from './task-entry.model';

export interface Project {
  id: number;
  name: string;
  tasks: TaskEntry[];
}
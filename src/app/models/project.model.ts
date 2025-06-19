import { TaskEntry } from './task-entry.model';

// export interface Project {
//   id: number;
//   name: string;
//   tasks: TaskEntry[];
// }
export interface Project {
  id: number;
  name: string;
  client: string;
  type: string;
  startDate: string;
  endDate: string;
  description?: string;
  comment?: string;
  tasks: TaskEntry[];
}
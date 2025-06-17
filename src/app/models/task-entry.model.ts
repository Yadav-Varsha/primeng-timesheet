export interface TaskEntry {
  id: number;
  description: string;
  billable: boolean;
  hours: { [day: string]: number }; // e.g., { Mon: 2, Tue: 4, ... }
}
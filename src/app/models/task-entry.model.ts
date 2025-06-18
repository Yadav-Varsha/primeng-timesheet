
export interface TaskEntry {
  id: number; // this is required
  description: string;
  billable: boolean;
  hours: { [day: string]: number };
}

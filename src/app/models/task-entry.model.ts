
// export interface TaskEntry {
//   id: number; // this is required
//   description: string;
//   billable: boolean;
//   hours: { [day: string]: number };
// }

export interface TaskEntry {
  id: number;
  name: string;
  description: string;
  billable: boolean;
  hours: { [day: string]: number };
  status: string;
}
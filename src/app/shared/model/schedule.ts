export interface Schedule{
    id: number;
    title: string;
    date: Date;
    starttime?: number;
    endtime?: number
    notes: string;
    done: boolean;
  }
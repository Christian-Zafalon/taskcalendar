export interface Schedule {
    id: number;
    title: string;
    date: Date;
    time?: number;
    notes: string;
    done: boolean;
  }
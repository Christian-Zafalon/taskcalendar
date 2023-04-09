import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Schedule } from '../model/schedule';

@Injectable({
  providedIn: 'root'
})
export class CommitmentFulfilledService {

  private commitmentsMade: Schedule[] = [
    {
      id: 1,
      title: 'Tarefa feita1',
      date: new Date(2022, 11, 30),
      notes: 'Meeting to decide on the business rule',
      done: true
    },
    {
      id: 2,
      title: 'Tarefa feita 2',
      date: new Date(2022, 11, 31),
      notes: 'Presentation of the final project to the client (Production)',
      done: true
    }
  ];
  

  constructor() {
    const finalizedAgenda = localStorage.getItem('commitmentsMade');
    if (finalizedAgenda) {
      this.commitmentsMade = JSON.parse(finalizedAgenda);
    } else {
      localStorage.setItem('commitmentsMade', JSON.stringify(this.commitmentsMade));
    }
  }

  getFinalizedSchedule(): Observable<Schedule[]> {
    const finalizedAgenda = localStorage.getItem('commitmentsMade');
    const commitmentsMade = finalizedAgenda ? JSON.parse(finalizedAgenda) : [];
    return of(commitmentsMade);
  }


  addFinalizedSchedule(commitment: Schedule): void {
    const id = this.commitmentsMade.length + 1
    commitment.id = id;
    commitment.done = true
    this.commitmentsMade.push(commitment);
    localStorage.setItem('commitmentsMade', JSON.stringify(this.commitmentsMade));
  }

  // putAgenda(commitment: Schedule): void {
  //   this.commitmentsMade.push(commitment);
  //   localStorage.setItem('commitmentsMade', JSON.stringify(this.commitmentsMade));
  // }

  updateFinalizedSchedule(id: number, updatedValues: Partial<Schedule>): void {
    const index = this.commitmentsMade.findIndex(commitment => commitment.id === id);
    if (index >= 0) {
      const updatedAgenda = { ...this.commitmentsMade[index], ...updatedValues };
      this.commitmentsMade[index] = updatedAgenda;
      localStorage.setItem('commitmentsMade', JSON.stringify(this.commitmentsMade));
    }
  }
  


  deleteFinalizedSchedule(id: number): void {
    this.commitmentsMade = this.commitmentsMade.filter(commitment => commitment.id !== id);
    localStorage.setItem('commitmentsMade', JSON.stringify(this.commitmentsMade));
  }
}

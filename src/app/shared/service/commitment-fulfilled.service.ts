import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Schedule } from '../model/schedule';

@Injectable({
  providedIn: 'root'
})
export class CommitmentFulfilledService {

  commitmentsMade!: Schedule[]

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
    let highestId = 0;
    for (let i = 0; i < this.commitmentsMade.length; i++) {
      if (this.commitmentsMade[i].id > highestId) {
        highestId = this.commitmentsMade[i].id;
      }
    }
    const newId = highestId + 1;
    commitment.id = newId;
    commitment.done = true;
    this.commitmentsMade.push(commitment);
    localStorage.setItem('commitmentsMade', JSON.stringify(this.commitmentsMade));
  }

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

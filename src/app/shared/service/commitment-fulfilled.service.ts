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
        title: 'MEETING',
        date: new Date(2023, 4, 1),
        notes: 'Meeting with stakeholders to discuss project requirements',
        starttime: 900,
        endtime: 1030,
        done: true
      },
      {
        id: 2,
        title: 'PRESENTATION',
        date: new Date(2023, 4, 3),
        notes: 'Presentation of the new product to investors',
        starttime: 1400,
        endtime: 1530,
        done: true
      },
      {
        id: 3,
        title: 'DISCUSSION',
        date: new Date(2023, 4, 5),
        notes: 'Discussion with development team on new feature implementation',
        starttime: 1100,
        endtime: 1200,
        done: true
      },
      {
        id: 4,
        title: 'TESTING',
        date: new Date(2023, 4, 7),
        notes: 'Testing of new feature on staging environment',
        starttime: 900,
        endtime: 1700,
        done: true
      },
      {
        id: 5,
        title: 'DEVELOPMENT',
        date: new Date(2023, 4, 10),
        notes: 'Development of the new feature for the app',
        starttime: 1000,
        endtime: 1200,
        done: true
      },
      {
        id: 6,
        title: 'TRAINING',
        date: new Date(2023, 4, 13),
        notes: 'Training on new software tools for the team',
        starttime: 900,
        endtime: 1200,
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


  // addFinalizedSchedule(commitment: Schedule): void {
  //   const id = this.commitmentsMade.length + 1
  //   commitment.id = id;
  //   commitment.done = true
  //   this.commitmentsMade.push(commitment);
  //   localStorage.setItem('commitmentsMade', JSON.stringify(this.commitmentsMade));
  // }

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

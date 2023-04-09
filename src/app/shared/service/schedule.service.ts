import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Schedule } from '../model/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private agendas: Schedule[] = [
    {
      id: 1,
      title: 'MEETING',
      date: new Date(2022, 11, 30),
      notes: 'Meeting to decide on the business rule',
      starttime: 1223,
      endtime: 1324,
      done: false
    },
    {
      id: 2,
      title: 'PRESENTATION',
      date: new Date(2022, 11, 31),
      notes: 'Presentation of the final project to the client (Production)',
      done: false
    },
    {
      id: 3,
      title: 'RESEARCH',
      date: new Date(2023, 0, 10),
      notes: 'Research on new technologies for the project',
      starttime: 900,
      endtime: 1200,
      done: false
    },
    {
      id: 4,
      title: 'DEVELOPMENT',
      date: new Date(2023, 0, 15),
      notes: 'Development of the new feature for the app',
      starttime: 1400,
      endtime: 1600,
      done: false
    },
    {
      id: 5,
      title: 'DISCUSSION',
      date: new Date(2023, 0, 25),
      notes: 'Discussion on project progress with the team',
      starttime: 1430,
      endtime: 1530,
      done: false
    },
    {
      id: 6,
      title: 'TRAINING',
      date: new Date(2023, 1, 5),
      notes: 'Training on new software tools for the team',
      starttime: 900,
      endtime: 1200,
      done: false
    }
  ];

  constructor() {
    const storedAgendas = localStorage.getItem('agendas');
    if (storedAgendas) {
      this.agendas = JSON.parse(storedAgendas);
    } else {
      localStorage.setItem('agendas', JSON.stringify(this.agendas));
    }
  }

  getAgendas(): Observable<Schedule[]> {
    const storedAgendas = localStorage.getItem('agendas');
    const agendas = storedAgendas ? JSON.parse(storedAgendas) : [];
    return of(agendas);
  }

  addAgenda(agenda: Schedule): void {
    let highestId = 0;
    for (let i = 0; i < this.agendas.length; i++) {
      if (this.agendas[i].id > highestId) {
        highestId = this.agendas[i].id;
      }
    }
    const newId = highestId + 1;
    agenda.id = newId;
    agenda.done = false;
    this.agendas.push(agenda);
    localStorage.setItem('agendas', JSON.stringify(this.agendas));
  }
  

  updateAgenda(id: number, updatedValues: Partial<Schedule>): void {
    const index = this.agendas.findIndex(agenda => agenda.id === id);
    if (index >= 0) {
      const updatedAgenda = { ...this.agendas[index], ...updatedValues };
      this.agendas[index] = updatedAgenda;
      localStorage.setItem('agendas', JSON.stringify(this.agendas));
    }
  }

  deleteAgenda(id: number): void {
    this.agendas = this.agendas.filter(agenda => agenda.id !== id);
    localStorage.setItem('agendas', JSON.stringify(this.agendas));
  }

}

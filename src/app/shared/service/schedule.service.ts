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
      time: '09:00',
      notes: 'Meeting to decide on the business rule',
      done: true
    },
    {
      id: 2,
      title: 'PRESENTATION',
      date: new Date(2022, 11, 31),
      time: '14:00',
      notes: 'Presentation of the final project to the client (Production)',
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
    const id = this.agendas.length + 1
    agenda.id = id;
    this.agendas.push(agenda);
    localStorage.setItem('agendas', JSON.stringify(this.agendas));
  }

  // putAgenda(agenda: Schedule): void {
  //   this.agendas.push(agenda);
  //   localStorage.setItem('agendas', JSON.stringify(this.agendas));
  // }

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

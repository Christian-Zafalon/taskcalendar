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
      title: 'REUNIAO',
      date: new Date(2022, 11, 30),
      time: '09:00',
      notes: 'Reunião de equipe'
    },
    {
      id: 2,
      title: 'APRESENTACAO',
      date: new Date(2022, 11, 31),
      time: '14:00',
      notes: 'Apresentação de projeto'
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
    this.agendas.push(agenda);
    localStorage.setItem('agendas', JSON.stringify(this.agendas));
  }

  deleteAgenda(id: number): void {
    this.agendas = this.agendas.filter(agenda => agenda.id !== id);
    localStorage.setItem('agendas', JSON.stringify(this.agendas));
  }

}

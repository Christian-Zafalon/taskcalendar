import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Schedule } from '../model/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  agendas!: Schedule[]

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

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private apiUrl = 'http://localhost:3000/schedules';

  constructor(private http: HttpClient) {}

  getAgendas(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  addAgenda(agenda: Schedule): Observable<Schedule> {
    agenda.done = false;
    return this.http.post<Schedule>(this.apiUrl, agenda);
  }

  updateAgenda(id: number, updatedValues: Partial<Schedule>): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${id}`, updatedValues);
  }

  deleteAgenda(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
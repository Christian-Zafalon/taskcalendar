import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Schedule } from '../model/schedule';

@Injectable({
  providedIn: 'root'
})
export class CommitmentFulfilledService {
  private apiUrl = 'http://localhost:3000/fulfilled';

  constructor(private http: HttpClient) {}

  getFinalizedSchedule(): Observable<Schedule[]> {
    return this.http.get<Schedule[]>(this.apiUrl);
  }

  addFinalizedSchedule(commitment: Schedule): Observable<Schedule> {
    commitment.done = true;
    return this.http.post<Schedule>(this.apiUrl, commitment);
  }

  updateFinalizedSchedule(id: number, updatedValues: Partial<Schedule>): Observable<Schedule> {
    return this.http.put<Schedule>(`${this.apiUrl}/${id}`, updatedValues);
  }

  deleteFinalizedSchedule(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
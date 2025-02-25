import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityLogsService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  getActivityLogs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/admin/activity-logs`);
  }

  getUserActivity(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/user/activity/${id}`);
  }
}

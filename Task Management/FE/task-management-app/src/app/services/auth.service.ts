import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth'; 
  private storageKey = 'authUser';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasValidSession());
  
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  public hasValidSession(): boolean {
    const user = this.getUserSession();
    console.log(user)
    return user !== null && Object.keys(user).length > 0;
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      tap((user: any) => {
        this.setUserSession(user); // Store user session
        this.isLoggedInSubject.next(true); // Update login state
      })
    );
  }

  setUserSession(user: any): void {
    this.isLoggedInSubject.next(true);
    localStorage.setItem('user', JSON.stringify(user)); 
  }

  getUserSession(): any {
    if (typeof window !== 'undefined' && localStorage) {
      return JSON.parse(localStorage.getItem('user') || '{}');
    }
    return null;
  }

  logout(): void {
    if (typeof window !== 'undefined' && localStorage) {
      localStorage.removeItem('user');
    }
    this.isLoggedInSubject.next(false);
  }
}

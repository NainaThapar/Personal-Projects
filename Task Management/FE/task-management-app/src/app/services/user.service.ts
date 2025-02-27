import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/admin';

  constructor(private http: HttpClient) { }

  getAllUsers() {
    return this.http.get<any[]>(`${this.baseUrl}/manage`);
  }

  updateUserRole(userId: number, newRole: String){
    return this.http.put<User>(`${this.baseUrl}/update-role/${userId}`, {role: newRole});
  }

  deleteUser(userId: number) {
    return this.http.delete<any>(`${this.baseUrl}/${userId}`);
  }
}

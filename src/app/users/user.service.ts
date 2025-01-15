// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { User } from "../model/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    const token = localStorage.getItem('auth_token'); // Recupera il token JWT dal LocalStorage
    
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Aggiungi altri header se necessari
      });
    return this.http.get<User[]>(`${environment.apiBaseUrl}/api/users`, { headers });
  }

  getUserProfile(id: string): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Recupera il token JWT dal LocalStorage
    
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Aggiungi altri header se necessari
      });
    return this.http.get(`${environment.apiBaseUrl}/api/users/${id}`, { headers });
  }

  updateUserProfile(user: any): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Recupera il token JWT dal LocalStorage
    
      const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Aggiungi altri header se necessari
      });
    return this.http.put(`${environment.apiBaseUrl}/api/users`, user, { headers });
  }
}

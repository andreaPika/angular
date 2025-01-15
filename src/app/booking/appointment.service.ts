import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppointmentService {

  constructor(private http: HttpClient) {}

  // Ottieni appuntamenti per un utente
  getAppointmentsByUser(userId: any): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Recupera il token JWT
          
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          });
    return this.http.get(`${environment.apiBaseUrl}/api/booking/appointments/user/${userId}`, { headers });
  }

  // Ottieni appuntamenti per un'azienda
  getAppointmentsByCompany(companyId: any): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Recupera il token JWT
          
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          });
    return this.http.get(`${environment.apiBaseUrl}/api/booking//appointments/company/${companyId}`, { headers });
  }
}

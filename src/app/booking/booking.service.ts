import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private http: HttpClient) {}

  // Recupera le disponibilità per una specifica azienda
  getAvailability(companyId: string): Observable<any[]> {
     const token = localStorage.getItem('auth_token'); // Recupera il token JWT
      
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/booking/company/${companyId}/availability`, { headers });
  }

  // Crea una prenotazione
  createBooking(userId: string, companyId: string, appointmentDateTime: string, details: string, title: string): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Recupera il token JWT
      
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      });
      const bookingData = {
        userId,
        companyId,
        appointmentDateTime,
        title,
        details,
      };
    return this.http.post(`${environment.apiBaseUrl}/api/booking`, bookingData, { headers });
  }
}

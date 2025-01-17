import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private baseUrl = 'http://localhost:3000/api/search';

  constructor(private http: HttpClient) {}

  search(query: string): Observable<any> {
  const token = localStorage.getItem('auth_token'); // Recupera il token JWT dal LocalStorage

      const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Aggiungi altri header se necessari
      });
    return this.http.get<any>(`${environment.apiBaseUrl}/api/search/?q=${query}`, { headers });
  }

  searchWithFilters(filters: any): Observable<any[]> {
  const token = localStorage.getItem('auth_token'); // Recupera il token JWT dal LocalStorage

      const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Aggiungi altri header se necessari
      });
    const params = new URLSearchParams();

    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        params.append(key, filters[key]);
      }
    });
    return this.http.get<any[]>(`${environment.apiBaseUrl}/api/search/ricerca?${params.toString()}`, { headers });
  }

  searchPartial(query: string): Observable<any> {
  const token = localStorage.getItem('auth_token'); // Recupera il token JWT dal LocalStorage

      const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // Aggiungi altri header se necessari
      });
    return this.http.get<any>(`${environment.apiBaseUrl}/api/search//ricerca-parziale?q=${query}`, { headers });
  }
}

// src/app/auth/auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Company } from '../model/company.model';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {


  constructor(private http: HttpClient) {}

  getById(id: string): Observable<any> {
    const token = localStorage.getItem('auth_token'); // Recupera il token JWT dal LocalStorage

    const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'  // Aggiungi altri header se necessari
    });
        
    return this.http.get<Company>(`${environment.apiBaseUrl}/api/company/${id}`, { headers });
}

getAll(): Observable<any> {
  const token = localStorage.getItem('auth_token'); // Recupera il token JWT dal LocalStorage

  const headers = new HttpHeaders({
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json'  // Aggiungi altri header se necessari
  });
      
  return this.http.get<Company>(`${environment.apiBaseUrl}/api/company`, { headers });
}

searchCompanies(query: string): Observable<any[]> {
  const token = localStorage.getItem('auth_token'); // Recupera il token JWT
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  });

  return this.http.get<any[]>(`${environment.apiBaseUrl}/api/company/search/${query}`, { headers });
}

registerCompany(company: any): Observable<any> {
  const token = localStorage.getItem('auth_token'); // Recupera il token JWT
  
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  });


  return this.http.get<any[]>(`${environment.apiBaseUrl}/api/company/search/${company}`, { headers });;
}
}

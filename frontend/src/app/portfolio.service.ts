import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  private apiUrl = 'http://localhost:3000/api/portfolio';

  constructor(private http: HttpClient) {}

  // Function to get headers with token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getPortfolio(): Observable<any[]> {
    // Include token in headers
    return this.http.get<any[]>(`${this.apiUrl}`, { headers: this.getHeaders() });
  }

  addAsset(newAsset: any): Observable<any> {
    // Include token in headers
    return this.http.post<any>(`${this.apiUrl}/add-asset`, newAsset, { headers: this.getHeaders() });
  }
}

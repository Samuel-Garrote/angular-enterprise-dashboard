import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  access_token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dashboard-api-production-2463.up.railway.app/auth';
  private token = signal<string | null>(localStorage.getItem('token'));

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password });
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
    this.token.set(token);
  }

  getToken() {
    return this.token();
  }

  isLoggedIn() {
    return this.token() !== null;
  }
  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
  }
}

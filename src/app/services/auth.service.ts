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

  //How the token get in to the signal and localStorage
  private token = signal<string | null>(localStorage.getItem('token'));

  //Login that connect with backend
  login(email: string, password: string) {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { email, password });
  }

  //We save token in two spaces
  setToken(token: string) {
    //localStorage: to persist between recharges
    localStorage.setItem('token', token);
    //Signal: To the UI reacts in live
    this.token.set(token);
  }

  getToken() {
    return this.token();
  }

  isLoggedIn(): boolean {
    const token = this.token();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
    this.token.set(null);
  }
}

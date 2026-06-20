import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dashboard-api-production-2463.up.railway.app/auth';
  private currentUser = signal<User | null>(null);
  user = this.currentUser.asReadonly();

  setUser(newUser: User) {
    this.currentUser.set(newUser);
  }

  clearUser() {
    this.currentUser.set(null);
  }

  getUsers(search?: string) {
    const url = search ? `${this.apiUrl}?search=${search}` : this.apiUrl;
    return this.http.get<User[]>(url);
  }

  createUser(data: { name: string; email: string; role: string; password: string }) {
    return this.http.post<User>(this.apiUrl, data);
  }

  updateUser(id: number, data: { name?: string; email?: string; role?: string }) {
    return this.http.patch<User>(`${this.apiUrl}/${id}`, data);
  }

  deleteUser(id: number) {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

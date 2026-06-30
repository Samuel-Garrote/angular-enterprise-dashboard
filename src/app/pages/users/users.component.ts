import { Component, inject, signal, computed, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, switchMap } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css',
})
export class UsersComponent implements OnInit {
  private userService = inject(UserService);
  role = input<string>();
  users = signal<User[]>([]);
  loading = signal(false);
  searchControl = new FormControl('');

  filteredUsers = computed(() => {
    const r = this.role();
    if (!r) return this.users();
    return this.users().filter((u) => u.role === r);
  });

  ngOnInit() {
    this.loading.set(true);
    // Initial load
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users.set(data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });

    // Live search with debounce, switchMap cancels stale requests
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((term) => this.userService.getUsers(term ?? '')),
      )
      .subscribe((data) => this.users.set(data));
  }

  deleteUser(id: number) {
    if (confirm('Delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
        this.users.update((current) => current.filter((u) => u.id !== id));
      });
    }
  }
}

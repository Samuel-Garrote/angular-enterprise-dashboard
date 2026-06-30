import { Component, inject, input, signal, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
  private userService = inject(UserService);
  id = input<string>();
  user = signal<User | null>(null);

  ngOnInit() {
    const userId = this.id();
    if (userId) {
      this.userService.getUser(Number(userId)).subscribe((data) => this.user.set(data));
    }
  }
}

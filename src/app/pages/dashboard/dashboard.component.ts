import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  private userService = inject(UserService);
  userCount = signal(0);

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.userCount.set(users.length);
    });
  }
}

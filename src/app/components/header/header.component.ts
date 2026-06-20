import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NotificationBadgeComponent } from '../notification-badge/notification-badge.component';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NotificationBadgeComponent, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private userService = inject(UserService);
  authService = inject(AuthService);
  user = this.userService.user;

  appTitle = 'Angular Enterprise Dashboard';
  notificationCount = 3;

  onNotificationsDismissed() {
    this.notificationCount = 0;
  }
}

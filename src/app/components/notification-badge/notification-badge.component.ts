import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-notification-badge',
  standalone: true,
  imports: [],
  templateUrl: './notification-badge.component.html',
  styleUrl: './notification-badge.component.css',
})
export class NotificationBadgeComponent {
  count = input.required<number>();
  closed = output<void>();

  onClosed() {
    this.closed.emit();
  }
}

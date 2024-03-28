import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  @Input() show: boolean = false;
  @Input() message: string = '';
  @Input() color: 'blue' | 'green' | 'red' = 'blue'; // Default to blue

  closeNotification() {
    this.show = false;
  }
}

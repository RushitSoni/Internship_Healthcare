import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  activeButton: string = ''; // Initialize it with an empty string or a default value

  changeColor(button: string): void {
    this.activeButton = button;
  }
}

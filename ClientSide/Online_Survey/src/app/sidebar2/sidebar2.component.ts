import { Component, ViewChild,ChangeDetectionStrategy } from '@angular/core';
import { Sidebar } from 'primeng/sidebar';
import {MatIconModule} from '@angular/material/icon';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrl: './sidebar2.component.css',
})
export class Sidebar2Component  {

  

  @ViewChild('sidebarRef') sidebarRef!: Sidebar;

  closeCallback(e: Event): void {
      this.sidebarRef.close(e);
  }

  sidebarVisible: boolean = false;

  favoritesVisible = true; // Add this variable to track the visibility state of "FAVORITES" section

 

  toggleFavoritesVisibility() {
    console.log('Toggling favorites visibility');
    this.favoritesVisible = !this.favoritesVisible;
    console.log('Favorites visibility:', this.favoritesVisible);
  }

  applicationVisible = true; 
  toggleApplicationVisibility() {
    this.applicationVisible = !this.applicationVisible;
  }


}

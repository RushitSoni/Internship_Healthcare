import { Component, ElementRef, ViewChild } from '@angular/core';

import { AccountService } from '../account/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {



  constructor(private router: Router,public accountService : AccountService){}
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef ;

  toggleNavbar() {
    this.navbarCollapse.nativeElement.classList.toggle('show');
  }
  logout(){
    this.accountService.logout()
  }
  
}



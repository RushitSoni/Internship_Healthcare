import { Component, Inject, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { DOCUMENT } from '@angular/common';
import { GlobalserviceService } from '../globalservice/globalservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  constructor(private accountService : AccountService,@Inject(DOCUMENT) private document: any,private globalservice : GlobalserviceService){}


  ngOnInit(): void {

    this.refreshUser()
    this.globalservice.FrontendUrl = this.document.location.href;
  }

  private  refreshUser(){
    const jwt=this.accountService.getJWT()

    if(jwt){

      this.accountService.refreshUser(jwt).subscribe({
        next:_ =>{

        },

        error:_=>{
            this.accountService.logout()
        }
      })

    }
    else{
      this.accountService.refreshUser(null).subscribe()
    }
  }
  
}


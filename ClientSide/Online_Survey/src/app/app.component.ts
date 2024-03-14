import { Component, Inject, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { DOCUMENT } from '@angular/common';
import { GlobalserviceService } from '../globalservice/globalservice.service';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {


  constructor(private accountService : AccountService,@Inject(DOCUMENT) private document: any,private globalservice : GlobalserviceService,
  private primengConfig: PrimeNGConfig){}


  ngOnInit(): void {

    this.primengConfig.ripple = true;
    this.primengConfig.zIndex = {
      modal: 1100,
      overlay: 1000,
      menu: 1000,
      tooltip: 1100
    };
    
    ///


    this.refreshUser()
    this.globalservice.FrontendUrl = window.location.hostname + ':' + window.location.port;
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


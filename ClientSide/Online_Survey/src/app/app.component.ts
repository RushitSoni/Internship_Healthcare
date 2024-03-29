import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { DOCUMENT } from '@angular/common';
import { GlobalserviceService } from '../globalservice/globalservice.service';
import { PrimeNGConfig } from 'primeng/api';
import { Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  user: any; // Change 'any' to the type of your user object if known
  userSubscription: Subscription | undefined;
  showNavbarAndFooter: boolean = true;
  
  constructor(private accountService : AccountService,@Inject(DOCUMENT) private document: any,private globalservice : GlobalserviceService,
  private primengConfig: PrimeNGConfig,
  private router: Router){

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showNavbarAndFooter = !event.url.includes('respondent');
      }
    });
  }







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

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    // Make an HTTP request to update user's status

   

    if(this.globalservice.SurveyorId){
      this.accountService.updateIsLogged(this.globalservice.SurveyorId,-1).subscribe()
      // this.globalservice.Logged=false
      
    }

   

    
  }
 
 
  @HostListener('window:unload', ['$event'])
  unloadHandler(event: Event) {
    // Perform your asynchronous task here
    // For example, make an HTTP request to update user status
    // if(this.globalservice.SurveyorId){
    //   this.accountService.updateIsLogged(this.globalservice.SurveyorId,0).subscribe()
    //   // this.globalservice.Logged=false
      
    // }
    this.refreshUser()
   
  }

  private  refreshUser(){
   
    // if(this.globalservice.Logged){
    //     return
      
    // }
    const jwt=this.accountService.getJWT()

    if(jwt){

      this.accountService.refreshUser(jwt).subscribe({
        next:_ =>{
          // if(this.globalservice.SurveyorId){
          //   this.accountService.updateIsLogged(this.globalservice.SurveyorId,true).subscribe()
          // }

          this.globalservice.Logged=true
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


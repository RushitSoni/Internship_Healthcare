import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from '../shared/Models/register';
import { environment } from '../../environments/environment.development';
import { Observable, ReplaySubject, Subscription, map, of, window } from 'rxjs';
import { Login } from '../shared/Models/login';
import { User } from '../shared/Models/user';
import { ResetPassword } from '../shared/Models/resetPassword';
import { ConfirmEmail } from '../shared/Models/confirmEmailDto';
import { LoginWithExternal } from '../shared/Models/loginWithExternal';
import { RegisterWithExternal } from '../shared/Models/registerWithExternal';
import { GlobalserviceService } from '../../globalservice/globalservice.service';
import { NotificationServiceService } from '../shared/components/modals/notifications/notification-service.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  
 
  private userSource = new ReplaySubject<User | null>(1)
  user$ = this.userSource.asObservable();

  userLoggedId :string | undefined 
  userSubscription: Subscription | undefined;

  constructor(private http:HttpClient, private router: Router,private globalService: GlobalserviceService,
    private notificatioService:NotificationServiceService) { }

  register(model:Register){
    this.notificatioService.displayNotification(` Registered SuccessFully !! Please Confirm Your Email.`, 'green')
    return this.http.post(`${environment.appUrl}/api/account/register`,model)
  }

  refreshUser(jwt : string | null){

   
    if(jwt=== null){

      this.userSource.next(null)
      return of(undefined)
    }
   
    let headers = new HttpHeaders()
    headers = headers.set('Authorization','Bearer ' +  jwt)

    return this.http.get<User>(`${environment.appUrl}/api/account/refresh-user-token`,{headers}).pipe(
      map((user:User)=>{
        if(user){

          // if(user.isLogged){
          //   // alert("Already Logged...")
          //   return
          // }
          this.globalService.Logged=true

          this.setUser(user)
          this.updateIsLogged(user.id,1).subscribe(
            (response)=>{
                console.log(response)
            },
            (error)=>{

            }
          )
           //global userID

           this.userSubscription=this.user$.subscribe((user) => {
            if(user)
              this.userLoggedId=user.id;
          });
  
          this.globalService.SurveyorId = this.userLoggedId;

        }
      })
    )
  }

  login(model : Login){


    
    // return this.http.post(`${environment.appUrl}/api/account/login`,model)
    return this.http.post<User>(`${environment.appUrl}/api/account/login`,model).pipe(
      map((user:User)=>{
        if(user){


          // if(user.isLogged){
          //   alert("Already Logged...")
          //   return
          // }

         
         
          this.updateIsLogged(user.id, 1).subscribe(
            (response)=>{
                this.globalService.Logged=true
                console.log(response , "And")
            },
            (error)=>{

            })

          this.setUser(user)
         
         
          //global userID

          this.userSubscription=this.user$.subscribe((user) => {
            if(user)
              this.userLoggedId=user.id;
          });
  
          this.globalService.SurveyorId = this.userLoggedId;
          this.notificatioService.displayNotification(` Login SuccessFully !!`, 'green')

        
           
          // return user

        }
      //  return null
      })
    )
  }

  logout(){

   
    const jwt=this.getJWT()
    localStorage.removeItem(environment.userKey)
    this.globalService.Logged=false
    this.notificatioService.displayNotification(`Logout SuccessFully !!`, 'green')

    // const subscription = this.user$.subscribe((user) => {
      
    //  if(user){
    //   this.updateIsLogged(user.id,false).subscribe((response)=>{

    //   })
    //  }
    // });
  if(this.globalService.SurveyorId){

    this.updateIsLogged(this.globalService.SurveyorId,0).subscribe((response)=>{

                
          //  this.refreshUser(jwt)

         })

  }
  
   

    this.userSource.next(null)

    this.globalService.SurveyorId=''
    
    

    this.router.navigateByUrl('/')
  }
  getJWT(){
    if (typeof localStorage !== 'undefined') {
      const key = localStorage.getItem(environment.userKey);
      if (key) {
        const user: User = JSON.parse(key);
        return user.jwt;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  
  // getJWT(){
  //   const key= localStorage.getItem(environment.userKey)
  //   if(key){
  //     const user:User = JSON.parse(key)
  //     return user.jwt
  //   }
  //   else{
  //     return null
  //   }
  // }
  
  confirmEmail(model:ConfirmEmail){
    return this.http.put(`${environment.appUrl}/api/account/confirm-email`,model)
  }

  resendEmailConfirmationLink(email:string){

    return this.http.post(`${environment.appUrl}/api/account/resend-email-confirmation-link/${email}`,{})


  }

  forgotUsernameOrPassword(email:string){

    return this.http.post(`${environment.appUrl}/api/account/forgot-username-or-password/${email}`,{})

  }

  resetPassword(model :ResetPassword){
      return this.http.put(`${environment.appUrl}/api/account/reset-password`,model)
  }

  registerWithThirdParty(model: RegisterWithExternal) {
    return this.http.post<User>(`${environment.appUrl}/api/account/register-with-third-party`, model).pipe(
      map((user: User) => {
        if (user) {
          this.setUser(user);
          this.notificatioService.displayNotification(` Registered SuccessFully !!`, 'green')
        }
      })

      
    );
  }

  

  loginWithThirdParty(model: LoginWithExternal) {
    return this.http.post<User>(`${environment.appUrl}/api/account/login-with-third-party`, model).pipe(
      map((user: User) => {
        if (user) {


        
          // if(user.isLogged){
          //   alert("Already Logged...")
          //   return
          // }
          // this.globalService.Logged=true
          this.setUser(user);
          // this.updateIsLogged(user.id,1)
         
          

           //global userID

           this.userSubscription=this.user$.subscribe((user) => {
            if(user)
              this.userLoggedId=user.id;
          });
  
          this.globalService.SurveyorId = this.userLoggedId;
          this.notificatioService.displayNotification(` Login SuccessFully !!`, 'green')
        }
      })
    )
  }

  private setUser(user : User){
   localStorage.setItem(environment.userKey,JSON.stringify(user))
  
    this.userSource.next(user)

    // this.user$.subscribe({
    //   next:response=> console.log(response)
    // })

  }


  updateIsLogged(userId: string, flag:number): Observable<User> {
    //console.log("UserID",userId)
    const body = { flag: flag }
    return this.http.put<User>(`${environment.appUrl}/api/account/update-islogged/${userId}/${flag}`, body);
  }
}

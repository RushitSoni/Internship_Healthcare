import { Component, OnInit } from '@angular/core';
import { ProfileService } from './profile.service';
import { Subscription } from 'rxjs';
import { AccountService } from '../account/account.service';
import { User } from '../shared/Models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent  implements OnInit{
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  dateCreated!:Date
  // profilePhoto: string = 'assets/default-profile-photo.jpg'; // Replace with the actual path

  showEditPopup: boolean = false;
  editType: 'name'  = 'name';

  editedFirstName: string = '';
  editedLastName: string = '';
 // editedEmail: string = '';


  user: any; // Change 'any' to the type of your user object if known
  userSubscription: Subscription | undefined;

  constructor( private profileService : ProfileService , private accountService:AccountService){}
  ngOnInit(): void {
    this.userSubscription = this.accountService.user$.subscribe((user) => {
      this.user = user;
      this.firstName=this.user.firstName;
      this.lastName=this.user.lastName;
      this.email=this.user.email;
      this.dateCreated=this.user.dateCreated
      
    });
  }

  openEditPopup(type: 'name' ) {
    this.showEditPopup = true;
    document.querySelector('.profile-container')?.classList.add('blur');
    document.querySelector('.edit-popup')?.classList.add('blur');
    this.editType = type;

    if (type === 'name') {
      this.editedFirstName = this.firstName;
      this.editedLastName = this.lastName;

    
    
    } 
  }

  // handlePhotoChange(event: Event) {
  //   console.log('Photo uploaded:', (event.target as HTMLInputElement).files);
  // }

  removePhoto() {
    console.log('Photo removed');
  }

  cancelEdit() {
    this.showEditPopup = false;
    document.querySelector('.profile-container')?.classList.remove('blur');
    document.querySelector('.edit-popup')?.classList.remove('blur');

    this.editedFirstName = '';
    this.editedLastName = '';
   
  }

  continueEdit() {
    // if (this.editType === 'name') {
    //   this.firstName = this.editedFirstName;
    //   this.lastName = this.editedLastName;
    // } else if (this.editType === 'email') {
    //   this.email = this.editedEmail;
    // }
    let updatedUser: User= {
      firstName: this.editedFirstName,
      lastName: this.editedLastName,
      email:this.user.email,
      role:this.user.role,
      id:this.user.id,
      jwt:this.user.jwt,
      provider:this.user.provider,
      dateCreated: this.user.dateCreated,
      //isLogged:this.user.isLogged

    };

    this.profileService.updateUser(this.user.id,updatedUser)
    .subscribe(
      (response) => {
        // Handle successful update
        console.log("User Updated :",response)
        this.firstName=response.firstName;
        this.lastName=response.lastName
       
      },
      (error) => {
        console.error("Error While Updating User :",error)
      }
    );

    this.showEditPopup = false;
    this.editedFirstName = '';
    this.editedLastName = '';
  
  }
}

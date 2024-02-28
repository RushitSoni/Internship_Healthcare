import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  firstName: string = 'John';
  lastName: string = 'Doe';
  email: string = 'john.doe@example.com';
  profilePhoto: string = 'assets/default-profile-photo.jpg'; // Replace with the actual path

  showEditPopup: boolean = false;
  editType: 'name' | 'email' | 'photo' = 'name';

  editedFirstName: string = '';
  editedLastName: string = '';
  editedEmail: string = '';

  openEditPopup(type: 'name' | 'email' | 'photo') {
    this.showEditPopup = true;
    document.querySelector('.profile-container')?.classList.add('blur');
    document.querySelector('.edit-popup')?.classList.add('blur');
    this.editType = type;

    if (type === 'name') {
      this.editedFirstName = this.firstName;
      this.editedLastName = this.lastName;
    } else if (type === 'email') {
      this.editedEmail = this.email;
    }
  }

  handlePhotoChange(event: Event) {
    console.log('Photo uploaded:', (event.target as HTMLInputElement).files);
  }

  removePhoto() {
    console.log('Photo removed');
  }

  cancelEdit() {
    this.showEditPopup = false;
    document.querySelector('.profile-container')?.classList.remove('blur');
    document.querySelector('.edit-popup')?.classList.remove('blur');

    this.editedFirstName = '';
    this.editedLastName = '';
    this.editedEmail = '';
  }

  continueEdit() {
    if (this.editType === 'name') {
      this.firstName = this.editedFirstName;
      this.lastName = this.editedLastName;
    } else if (this.editType === 'email') {
      this.email = this.editedEmail;
    }

    this.showEditPopup = false;
    this.editedFirstName = '';
    this.editedLastName = '';
    this.editedEmail = '';
  }
}

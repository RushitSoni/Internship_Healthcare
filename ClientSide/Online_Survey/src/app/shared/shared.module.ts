import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { ValidationMessagesComponent } from './components/errors/validation-messages/validation-messages.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NotificationsComponent } from './components/modals/notifications/notifications.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    NotFoundComponent,
    ValidationMessagesComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule

   
  ],
  exports:[
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,

   ValidationMessagesComponent
  ]
})
export class SharedModule { }

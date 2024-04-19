import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RespondentRoutingModule } from './respondent-routing.module';
import { TakesurveyComponent } from './takesurvey/takesurvey.component';
import { FillComponent } from './fill/fill.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompleteComponent } from './complete/complete.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DescriptionComponent } from './description/description.component';
import { MatIcon } from '@angular/material/icon';
import { AlreadyFilledComponent } from './already-filled/already-filled.component';

@NgModule({
  declarations: [
    TakesurveyComponent,
    FillComponent,
    CompleteComponent,
    DescriptionComponent,
    AlreadyFilledComponent
  ],
  imports: [
    CommonModule,
    RespondentRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,
    MatCardModule,
    MatIcon
  ]
})

export class RespondentModule { }
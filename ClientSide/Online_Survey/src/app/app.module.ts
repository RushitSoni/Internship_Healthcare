import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AdminComponent } from './admin/admin.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptor } from './shared/interceptors/jwt.interceptor';
import { SecondPageComponent } from './second-page/second-page.component';
import { UserSuccessStoriesComponent } from './user-success-stories/user-success-stories.component';
import { SurveyStatisticsComponent } from './survey-statistics/survey-statistics.component';
import { BlogComponent } from './blog/blog.component';
import { SupportComponent } from './support/support.component';
import { GetStartedComponent } from './get-started/get-started.component';



import { FormsModule } from '@angular/forms';
import { WorkspaceModule } from './workspace/workspace.module';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LandingPageComponent,
    AdminComponent,

    
    SecondPageComponent,
    UserSuccessStoriesComponent,
    SurveyStatisticsComponent,
    BlogComponent,
    SupportComponent,
    GetStartedComponent,
   

    
  ],

  imports: [BrowserModule, AppRoutingModule, NgbModule, SharedModule,HttpClientModule,FormsModule,WorkspaceModule],
  // providers: [
  //   provideClientHydration()
  // ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

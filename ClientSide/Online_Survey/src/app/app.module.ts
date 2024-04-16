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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ProfileComponent } from './profile/profile.component';
import { Sidebar2Component } from './sidebar2/sidebar2.component';

import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TableComponent } from './table/table.component';


import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { GraphsComponent } from './graphs/graphs.component';
import { ResponseVisulizationComponent } from './workspace/response-visulization/response-visulization.component';
import { MySurveysComponent } from './my-surveys/my-surveys.component';


import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { NotificationComponent } from './notification/notification.component';
import { HelpModuleComponent } from './help-module/help-module.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';



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
    ProfileComponent,
    Sidebar2Component,
    TableComponent,
    GraphsComponent,
    MySurveysComponent,
    NotificationComponent,
    HelpModuleComponent,

   
  ],

  imports: [BrowserModule, AppRoutingModule, NgbModule, SharedModule,HttpClientModule,FormsModule,WorkspaceModule,MatButtonModule,  MatIconModule,
    AvatarModule,

    SidebarModule,
    ButtonModule,
    BrowserAnimationsModule,
    TableModule,
    NgxChartsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,

    NgxExtendedPdfViewerModule
   
    
],
  // providers: [
  //   provideClientHydration()
  // ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthorizationGuard } from './shared/guards/authorization.guard';
import { adminAuthGuard } from './shared/guards/admin-auth.guard';
import { MySurveysComponent } from './my-surveys/my-surveys.component';
import { GraphsComponent } from './graphs/graphs.component';
import { HelpModuleComponent } from './help-module/help-module.component';


const routes: Routes = [

 
  {
    path:'',component:LandingPageComponent
  },

  {
    path:'home',component:HomeComponent, canActivate:[AuthorizationGuard]
  },
  {
    path:'help',component:HelpModuleComponent 
  },
  {
    path:'profile', component:ProfileComponent, canActivate:[AuthorizationGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate:[adminAuthGuard]
  
  },
  {
    path: 'admin/charts',
    component:GraphsComponent,
    canActivate:[adminAuthGuard]
  },
  {
    path: 'mysurveys',
    component: MySurveysComponent,
    canActivate:[AuthorizationGuard]
  
  },
 
 
  
  //Implementing lazy loading
  {path:'account',loadChildren:()=>import('./account/account.module').then(module=>module.AccountModule)},
  {path:'workspace',loadChildren:()=>import('./workspace/workspace.module').then(module=>module.WorkspaceModule)},
  {path:'create',loadChildren:()=>import('./create/create.module').then(module=>module.CreateModule)},
  {path:'respondent',loadChildren:()=>import('./respondent/respondent.module').then(module=>module.RespondentModule)},
  {path:'not-found',component:NotFoundComponent},
  {path:'**',component:NotFoundComponent,pathMatch:'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

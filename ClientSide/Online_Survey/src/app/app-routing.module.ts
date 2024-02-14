import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NotFoundComponent } from './shared/components/errors/not-found/not-found.component';

const routes: Routes = [
  {
    path:'',component:LandingPageComponent
  },

  {
    path:'home',component:HomeComponent
  },
  
  //Implementing lazy loading
  {path:'account',loadChildren:()=>import('./account/account.module').then(module=>module.AccountModule)},
  {path:'workspace',loadChildren:()=>import('./workspace/workspace.module').then(module=>module.WorkspaceModule)},
  {path:'not-found',component:NotFoundComponent},
  {path:'**',component:NotFoundComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { OnlyforauthenticatedComponent } from './onlyforauthenticated/onlyforauthenticated.component';
import { authGuard } from './services/auth.guard';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

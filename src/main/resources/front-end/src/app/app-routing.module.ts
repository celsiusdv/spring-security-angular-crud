import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { authGuard } from './services/auth.guard';
import { ToolsManagementComponent } from './tools-management/tools-management.component';
import { UpdateDeleteComponent } from './tools-management/update-delete/update-delete.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"tools-management",component:ToolsManagementComponent},
  {path:"update-delete/:index",component:UpdateDeleteComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

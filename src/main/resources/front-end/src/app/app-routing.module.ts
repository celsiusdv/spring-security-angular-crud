import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { adminGuard, toolsGuard } from './services/auth.guard';
import { ToolsManagementComponent } from './tools-management/tools-management.component';
import { UpdateDeleteComponent } from './tools-management/update-delete/update-delete.component';
import { AdminPaneComponent } from './admin-pane/admin-pane.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"tools-management",component:ToolsManagementComponent, canActivate:[toolsGuard]},
  {path:"update-delete/:index",component:UpdateDeleteComponent},
  {path:"admin",component:AdminPaneComponent, canActivate:[adminGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon'; 
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field'; 
import { MatInputModule } from '@angular/material/input'; 
import { MatTableModule } from '@angular/material/table';
import {MatCardModule} from '@angular/material/card'; 

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { ToolListComponent } from './home/tool-list/tool-list.component';
import { ToolService } from './services/tool.service';
import { JwtInterceptorService } from './services/jwt.interceptor';
import { ToolsManagementComponent } from './tools-management/tools-management.component';
import { UpdateDeleteComponent } from './tools-management/update-delete/update-delete.component';
import { RequiredRoleDirective } from './services/required-role.directive';
import { AdminPaneComponent } from './admin-pane/admin-pane.component';
import { AdminService } from './services/admin.service';



const MaterialModule= [
  NoopAnimationsModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule,
  MatCardModule
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ToolListComponent,
    ToolsManagementComponent,
    UpdateDeleteComponent,
    RequiredRoleDirective,
    AdminPaneComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule
  ],
  providers: [//services goes in this array
    AuthenticationService,
    ToolService,
    JwtInterceptorService,
    AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

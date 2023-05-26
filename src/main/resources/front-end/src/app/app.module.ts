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

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { ToolListComponent } from './home/tool-list/tool-list.component';
import { ToolService } from './services/tool.service';
import { JwtInterceptorService } from './services/jwt.interceptor';
import { ToolsManagementComponent } from './tools-management/tools-management.component';
import { UpdateDeleteComponent } from './tools-management/update-delete/update-delete.component';



const MaterialModule= [
  NoopAnimationsModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatTableModule
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ToolListComponent,
    ToolsManagementComponent,
    UpdateDeleteComponent
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
  providers: [AuthenticationService,ToolService, JwtInterceptorService],//services goes in this array
  bootstrap: [AppComponent]
})
export class AppModule { }

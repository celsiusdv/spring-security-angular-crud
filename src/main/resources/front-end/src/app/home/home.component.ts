import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  logged:boolean=false;
  constructor(private auth:AuthenticationService){
    this.auth.isLoggedIn().subscribe(value =>{this.logged=value;});
  }
}

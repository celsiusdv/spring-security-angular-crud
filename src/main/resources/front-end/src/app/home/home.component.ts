import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  loginStatus!:BehaviorSubject<boolean>;

  constructor(private auth:AuthenticationService){
    this.loginStatus=this.auth.loginStatus;//show components according to login status in the home.component.html
  }
}

import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Authentication System';
  loginStatus!:BehaviorSubject<boolean>;

  constructor(private auth:AuthenticationService){
    this.loginStatus=this.auth.loginStatus;
  }
  public logout():void{
    console.log("logout clicked")
    this.auth.logout();
  }
}

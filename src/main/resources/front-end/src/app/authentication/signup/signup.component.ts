import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;
  
  constructor(private auth:AuthenticationService,private goBack: Router) {

    this.signupForm = new FormGroup({
        username:new FormControl(null,[Validators.required,Validators.minLength(3)]),
        password:new FormControl(null,[Validators.required,Validators.minLength(5)])
    });
    
  }
  public get formControls() { return this.signupForm.controls; }

  public send(): void {
    const user:User=this.signupForm.value;
    this.auth.createUser(user).subscribe({
        next: (data) => {
            console.log(data);
            this.goBack.navigate(['/']);
        }
    });
  }
}

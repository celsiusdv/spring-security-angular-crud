import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  constructor() {

    this.signupForm = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(3)])
    });
    
  }
  public get formControls() { return this.signupForm.controls; }

  public send(): void {
    console.log(this.formControls['username'].value);
    console.log(this.signupForm.value + " testing input from signup.component.ts");
  }
}

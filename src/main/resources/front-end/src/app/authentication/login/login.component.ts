import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  formLogin:FormGroup;
  user!:User;

  constructor(private auth: AuthenticationService,
    private route: ActivatedRoute, private router: Router) {

    this.formLogin = new FormGroup({
      username: new FormControl(null, null),
      password: new FormControl(null, null)
    });
  }

  public get formControls(){ return this.formLogin.controls; }

  public send(): void {
    this.user = this.formLogin.value;
    this.auth.login(this.user).subscribe({//validations and handlings of the logged-in user on AuthenticationService.ts, login method
      next: () => {
        const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/login';// get return url from query parameters or default to home page
        this.router.navigateByUrl(returnUrl);
      },
      error: exception => {
        this.auth.logout();//just temporary to test log-in wrong inputs
        console.log(exception);
      }
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	private apiUrl: string = "http://localhost:8080/api/auth";
	private loginSubject!: BehaviorSubject<boolean>;
	private user!: User;

	constructor(private router: Router, private http: HttpClient) {
		this.keepSession();
	}

	public login(body: User): Observable<any> {//send the body to the server
		return this.http.post<any>(`${this.apiUrl}/login`, body)
			.pipe(map(value => {//return the user from the server
				this.user = value;
				console.log(this.user);
				// store token in local storage to keep user logged in between page refreshes
				if (this.user.token != null) {
					localStorage.setItem('token', `${this.user.token}`);
				//progapate boolean value to all elements in the specified html tags
					this.loginSubject.next(true);
					console.log("inside login method from authentication service: logged user?=")
					console.log(this.isLoggedIn);
				}
			}));
	}
// methods to allow components to be shown according to the login status
	public get loginStatus():BehaviorSubject<boolean>{return this.loginSubject;}
	public get isLoggedIn():boolean{return this.loginSubject.value;}
	public get getToken():string | null {return localStorage.getItem('token');}

	//keep the session for each refresh page
	private keepSession():void{
		if(this.getToken !== null) this.loginSubject= new BehaviorSubject(true);
		else this.loginSubject= new BehaviorSubject(false);
		
	}

	//remove user and token from local storage to log user out
	public logout(): void {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		this.loginSubject.next(false);
		this.router.navigate(['/login']);
	}

}

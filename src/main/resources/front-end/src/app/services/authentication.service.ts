import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject, map, of, take, tap } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

	private apiUrl: string = "http://localhost:8080/api/auth";
	private isLogged: boolean = false;
	private user!: User;

	constructor(private router: Router, private http: HttpClient) {
	}

	public isLoggedIn(): Observable<boolean> {//method utilized for guards, and authorizations
		return of(this.isLogged).pipe(tap((booleanValue) => console.log(booleanValue)));
	}

	public login(body: User): Observable<any> {//send the body to the server
		return this.http.post<any>(`${this.apiUrl}/login`, body)
			.pipe(map(value => {//return the body from the server
				this.user = value;
				console.log(this.user);
				if (this.user.token != null) {
// store user details and jwt token in local storage to keep user logged in between page refreshes
					localStorage.setItem('user', JSON.stringify(this.user));
					localStorage.setItem('token',`${this.user.token}`);
					console.log(this.user.authorities[0].authority)
					this.isLogged = true;
				}
		} ) );
	}


	public getToken():string | null {return localStorage.getItem('token');}

	public logout(): void {
		//remove user and token from local storage to log user out
		localStorage.removeItem('user');
		localStorage.removeItem('token');
		this.router.navigate(['/login']);
	}

}

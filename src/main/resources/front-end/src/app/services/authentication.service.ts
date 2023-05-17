import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, of, tap } from 'rxjs';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  apiUrl:string="http://localhost:8080/api/auth";
  private isLogged:boolean=false;
  private userSubject: BehaviorSubject<User | null>;
  public user: Observable<User | null>;
  
  constructor(private router: Router,private http: HttpClient) {
    this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
    this.user = this.userSubject.asObservable();
  }
  
  public get userValue() {return this.userSubject.value;}
  
  public isLoggedIn():Observable<boolean> {//effects of this methods are applied in auth.guard.ts
    //return of(this.isLoggedin);
    return of(this.isLogged).pipe(tap((v) => console.log(v)));
  }

/*   public login(user: User):Observable<Object> {
    return this.http.post<any>(`${this.apiUrl}/login`, { user })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        if(user != null){
          console.log(this.userValue);
          this.isLogged=true;
          this.isLoggedIn().subscribe();
        }
        return user;
      }));
  } */
  public login(user: User): Observable<Object> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }

  public logout():void {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['/login']);
  }

}

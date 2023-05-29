import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
    private apiUrl: string = "http://localhost:8080/api/admin";
  constructor(private http: HttpClient) { }

  // /user/{id} DELETE

  public getUsers():Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }
}

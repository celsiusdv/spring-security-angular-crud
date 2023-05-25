import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Tool } from '../_models/tool';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolService {
  private apiUrl: string = "http://localhost:8080/api/tool-management";

  constructor(private router:Router, private http:HttpClient) { }
  
  /*TO DO: create crud methods
  POST: /tool {body}
  GET: /tools ✔️
  GET: /tool/{id}
  PUT: /tool/{id} {body}
  DELETE: /tool/{id}
  */
  public getToolList(): Observable<Tool[]> {
    return this.http.get<Tool[]>(`${this.apiUrl}/tools`);
  }

}

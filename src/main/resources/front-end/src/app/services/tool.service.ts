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

   constructor(private http: HttpClient) { }


   public saveTool(tool: Tool): Observable<Object> {
      return this.http.post(`${this.apiUrl}/tool`, tool);
   }
   public getToolList(): Observable<Tool[]> {
      return this.http.get<Tool[]>(`${this.apiUrl}/tools`);
   }
   public updateTool(toolId: number, tool: Tool): Observable<Object> {
      return this.http.put(`${this.apiUrl}/tool/${toolId}`, tool);
   }
   public deleteTool(toolId: number): Observable<Object> {
      return this.http.delete(`${this.apiUrl}/tool/${toolId}`, { responseType: 'text' });
   }

}

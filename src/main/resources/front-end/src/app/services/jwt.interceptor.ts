import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  private apiUrl: string = "http://localhost:8080/api/tool-management";
  constructor(private auth:AuthenticationService) {}

  intercept(request: HttpRequest<unknown>,
            next: HttpHandler): Observable<HttpEvent<unknown>> {

    const token = this.auth.getToken;
    const isLoggedIn = this.auth.isLoggedIn;

    if(isLoggedIn== true && token !=null ){
		request = request.clone({
			setHeaders: {
				 Authorization: `Bearer ${token}`
				}
		});
    }
    return next.handle(request);
  }
}
export const JwtInterceptorService = [{ 
    provide : HTTP_INTERCEPTORS,
    useClass : JwtInterceptor,
    multi : true
  }
]

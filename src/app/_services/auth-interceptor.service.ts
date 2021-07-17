import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,HttpHeaders, HttpResponse } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: any = localStorage.getItem('token')
    console.log('Intercepted request' + request.url);

  
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
       
  

    // if (!request.headers.has('Content-Type')) {

    //     request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
    // }

    // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log('event--->>>', event);
            }
            return event;
        }));
}
 
  }

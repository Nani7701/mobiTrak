

import {HttpRequest,HttpHandler,HttpEvent,HttpInterceptor,HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import {Router} from '@angular/router'

@Injectable()
export class Interceptor implements HttpInterceptor {

    constructor(private routerNavigate:Router){

    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            headers:  req.headers.set('content-type', 'application/json'),
            responseType: 'json',
          });
          return next.handle(req)
          .pipe(
            retry(1),
            tap(evt => {
              if (evt instanceof HttpResponse) {
                  if(evt.body.code==1 && evt.body.status==2){
                // console.log(evt.body.message)
                this.routerNavigate.navigate([''])
            
                  }
                      
              }
          }),
            catchError((error: HttpErrorResponse) => {
              let errorMessage = '';
          

            if(error.error.status==401){
              this.routerNavigate.navigate(['/signIn']);

              return throwError(error.error);
            }

              return throwError(error.error);
            })
          );
        }
    }






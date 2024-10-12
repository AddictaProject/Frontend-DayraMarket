import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Optional, Inject, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Environment } from '../enviroment/environment';
import { LocalizationService } from './Services/localiztionService/localization.service';


@Injectable()
export class HeadersInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const router = inject(Router);
    const token = localStorage.getItem('accessToken') ?? '';
    const lang= ( localStorage.getItem('language') ?? 'en' )=='en'?'en-US':'ar-EG' ;
    const authReq = req.clone({
      headers: req.headers.set('X-API-KEY', Environment.apiKey).set('Authorization', `Bearer ${token}`),
      params: req.params.append('culture',lang)
    });

    return next.handle(authReq).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            // Specific handling for unauthorized errors
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            router.navigate(['/login']); // Redirect to login or error page
            // Alternative: You might trigger a re-authentication flow here
          } else {
            // Handle other HTTP error codes
            console.error('HTTP error:', err);
          }
        } else {
          // Handle non-HTTP errors
          console.error('An error occurred:', err);
        }

        // Re-throw the error to propagate it further
        return throwError(() => err);
      })
    );
  }
}

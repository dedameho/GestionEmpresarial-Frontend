import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ToastService } from '../services/toast.service';

@Injectable()
export class ErrorsInterceptor implements HttpInterceptor {

  constructor(
    private toast:ToastService
    ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if(error.error && error.error.message) {
          this.toast.showErrorToast(error.error.message)
        }else{
          this.toast.showErrorToast(error.message)
        }
        if(error.status==404)this.toast.showErrorToast("Recurso no encontrado")

        return throwError(()=>new Error(error.message));
      })
    );
  }
}

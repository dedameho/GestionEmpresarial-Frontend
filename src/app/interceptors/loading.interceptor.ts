import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    this.requests.push(request);

    this.loadingService.showLoading(); // Mostrar el spinner de carga

    return next.handle(request).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          this.removeRequest(request);
          if (this.requests.length === 0) {
            setTimeout(()=>{
              this.loadingService.hideLoading(); // Ocultar el spinner de carga
            },200)
          }
        }
      }, (error) => {
        this.removeRequest(request);
        if (this.requests.length === 0) {
          setTimeout(()=>{
            this.loadingService.hideLoading(); // Ocultar el spinner de carga
          },200) // Ocultar el spinner de carga en caso de error también
        }
      })
    );
  }

  private removeRequest(request: HttpRequest<any>) {
    const index = this.requests.indexOf(request);
    if (index >= 0) {
      this.requests.splice(index, 1);
    }
  }
}


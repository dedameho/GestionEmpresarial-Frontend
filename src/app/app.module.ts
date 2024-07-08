import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { ClientesService } from './services/clientes.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './services/toast.service';
import { ConfirmComponent } from './confirm/confirm.component';
import { ErrorsInterceptor } from './interceptors/error.interceptor';
import { ProductosService } from './services/productos.service';
import { LoadingComponent } from './loading/loading.component';
import { CotizacionesService } from './services/cotizaciones.service';
import { LoadingInterceptor } from './interceptors/loading.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ToastComponent,
    ConfirmComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    ClientesService,
    ToastService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorsInterceptor,
      multi:true
    },
    ProductosService,
    CotizacionesService,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:LoadingInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

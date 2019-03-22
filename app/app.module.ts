import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CotizacionModule } from './modules/cotizacion/cotizacion.module';
import { VentaModule } from './modules/venta/venta.module';
import { AppInjector } from './utils/app-injector';
import { LoginModule } from './modules/login/login.module';
import { HomeModule } from './modules/home/home.module';
import { ProductoModule } from './modules/producto/producto.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CotizacionModule,
    VentaModule,
    LoginModule,
    HomeModule,
    ProductoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(injector: Injector) {
    AppInjector.setInjector(injector);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CotizacionRoutingModule } from './cotizacion-routing.module';
import { DatosAutoComponent } from './auto/datos-auto/datos-auto.component';
import { DatosAseguradoComponent } from './auto/datos-asegurado/datos-asegurado.component';
import { CotizacionComponent } from './auto/cotizacion/cotizacion.component';
import { OfertasComponent } from './auto/ofertas/ofertas.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfirmacionComponent } from './auto/confirmacion/confirmacion.component';

@NgModule({
  declarations: [
    DatosAutoComponent,
    DatosAseguradoComponent,
    OfertasComponent,
    CotizacionComponent,
    ConfirmacionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CotizacionRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class CotizacionModule { }

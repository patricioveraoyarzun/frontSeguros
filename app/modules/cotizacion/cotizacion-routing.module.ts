import { OfertasComponent } from './auto/ofertas/ofertas.component';
import { DatosAseguradoComponent } from './auto/datos-asegurado/datos-asegurado.component';
import { DatosAutoComponent } from './auto/datos-auto/datos-auto.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CotizacionComponent } from './auto/cotizacion/cotizacion.component';
import { ConfirmacionComponent } from './auto/confirmacion/confirmacion.component';

const routes: Routes = [
  { path: 'dauto', component: DatosAutoComponent},
  { path: 'dasegurado', component: DatosAseguradoComponent},
  { path: 'oferta', component: OfertasComponent},
  { path: 'cotizacion', component: CotizacionComponent},
  { path: 'confirmacion', component: ConfirmacionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CotizacionRoutingModule { }

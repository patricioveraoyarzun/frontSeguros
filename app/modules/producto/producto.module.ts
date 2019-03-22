import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoComponent } from './producto/producto.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProductoComponent],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    CoreModule,
    SharedModule
  ]
})
export class ProductoModule { }

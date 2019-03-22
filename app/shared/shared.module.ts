import { Ng2Rut } from 'ng2-rut';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuVerticalComponent } from './components/menu-vertical/menu-vertical.component';
import { MenuHorizontalComponent } from './components/menu-horizontal/menu-horizontal.component';
import { ModalSalirComponent } from './components/modal-salir/modal-salir.component';

@NgModule({
  declarations: [MenuVerticalComponent, MenuHorizontalComponent, ModalSalirComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    Ng2Rut
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    Ng2Rut,
    MenuVerticalComponent,
    MenuHorizontalComponent,
    ModalSalirComponent
  ]
})
export class SharedModule { }

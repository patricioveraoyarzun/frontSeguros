import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core/core.module';
import { SignupDatosUsuarioComponent } from './signup-datos-usuario/signup-datos-usuario.component';
import { SignupPasswordComponent } from './signup-password/signup-password.component';

@NgModule({
  declarations: [LoginComponent, SignupDatosUsuarioComponent, SignupPasswordComponent],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ]
})

export class LoginModule { }

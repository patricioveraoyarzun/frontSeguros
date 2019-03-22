import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupDatosUsuarioComponent } from './signup-datos-usuario/signup-datos-usuario.component';
import { SignupPasswordComponent } from './signup-password/signup-password.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'signupdatosusuario', component: SignupDatosUsuarioComponent},
  { path: 'signuppassword', component: SignupPasswordComponent}

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }

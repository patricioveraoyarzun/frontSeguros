import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { AppConstants } from 'src/app/utils/app-constants';
import { LoginService } from 'src/app/core/services/login.service';
import { AlertasService } from 'src/app/core/services/alertas.service';


declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends BaseComponent implements OnInit, AfterViewInit {

  formLogin: any;

  constructor(private routerSrv: Router, private loginService: LoginService,
     private alertasService: AlertasService) {
    super();
   }

   ngOnInit() {
    super.ngOnInit();
    this.formLogin = this.formBuilder.group({
      'usuario': new FormGroup({
        'username': new FormControl('', Validators.required),
        'password': new FormControl('', Validators.required)
      })
    });
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    $(document).ready(function () {
      $('.nav-tabs a').on('click', function() {
        $('.nav-tabs').find('.active').removeClass('active');
        $(this).parent().addClass('active');
      });
    });
  }

  onSubmit() {
    this.validateForm(this.formLogin);
    if (this.formLogin.valid) {
      const result = Object.assign({}, this.formLogin.value);
      const usuario = {username: result.usuario.username, password: result.usuario.password};
      this.loginService.autorizar(usuario).subscribe(data => {
        this.routerSrv.navigate(['/home']);
      },
      error => {
        if (error.status = 401) {
          // No autorizado
          this.alertasService.error('Nombre de usuario o contraseña incorrectos');
        } else {
          this.alertasService.error(error);
        }
      }
      );
    }
  }

  singnUp(){
        this.routerSrv.navigate(['/signupdatosusuario']);
  }

  isControlInvalid(idcontrol: string): boolean {
    const ctrl = this.formLogin.get(idcontrol);
    console.log(ctrl);
    return (ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }
}


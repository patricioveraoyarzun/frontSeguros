import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'signup-datos-usuario',
  templateUrl: './signup-datos-usuario.component.html',
  styleUrls: ['./signup-datos-usuario.component.css']
})
export class SignupDatosUsuarioComponent extends BaseComponent implements OnInit, AfterViewInit {

  formSignUp: any;
  constructor(private routerSrv: Router) {
    super();
   }

  ngOnInit() {
    super.ngOnInit();
    this.formSignUp = this.formBuilder.group({
      'usuario': new FormGroup({
        'rut': new FormControl('', Validators.required),
        'razonSocial': new FormControl('', Validators.required),
        'nombre': new FormControl('', Validators.required),
        'apellido': new FormControl('', Validators.required),
        'email': new FormControl('', Validators.required),
        'telefono': new FormControl('', Validators.required)
      })
    });
  }

  isControlInvalid(idcontrol: string): boolean {
    const ctrl = this.formSignUp.get(idcontrol);
    console.log(ctrl);
    return (ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }
  onSubmit() {
    this.validateForm(this.formSignUp);
    if (this.formSignUp.valid) {
      this.routerSrv.navigate(['/signuppassword']);
    }
  }

  login(){
        this.routerSrv.navigate(['/login']);
  }
}

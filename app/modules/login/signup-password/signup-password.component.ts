import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var $: any;

@Component({
  selector: 'signup-password',
  templateUrl: './signup-password.component.html',
  styleUrls: ['./signup-password.component.css']
})
export class SignupPasswordComponent extends BaseComponent implements OnInit, AfterViewInit {

  formSignUpPassword: any;
  constructor(private routerSrv: Router) {
    super();
   }

  ngOnInit() {
    super.ngOnInit();
    this.formSignUpPassword = this.formBuilder.group({
      'usuario': new FormGroup({
        'password': new FormControl('', Validators.required),
        'passwordconfirm': new FormControl('', Validators.required)
      })
    });
  }

  isControlInvalid(idcontrol: string): boolean {
    const ctrl = this.formSignUpPassword.get(idcontrol);
    console.log(ctrl);
    return (ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }
  onSubmit() {
    this.validateForm(this.formSignUpPassword);
    if (this.formSignUpPassword.valid) {
      this.routerSrv.navigate(['/login']);
    }
  }

  login(){
      this.routerSrv.navigate(['/login']);
  }
}

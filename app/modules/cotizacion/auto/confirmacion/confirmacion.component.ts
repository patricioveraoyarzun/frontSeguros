import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent extends BaseComponent implements OnInit {

  constructor(private routerSrv: Router) {
    super();
   }

  ngOnInit() {
  }

  onSubmit() {

  }

  volver(){
    this.routerSrv.navigate(['/home']);
  }
}

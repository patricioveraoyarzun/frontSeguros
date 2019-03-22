import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base/base.component';

import { FormGroup, FormArray, FormControl } from "@angular/forms";
import { debounceTime, distinctUntilChanged, mergeMap } from "rxjs/operators";
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: "cotizacion",
  templateUrl: "./cotizacion.component.html",
  styleUrls: ["./cotizacion.component.css"]
})
export class CotizacionComponent extends BaseComponent implements OnInit {
  formDatosCOtizacion: FormGroup;

  constructor(private routerSrv: Router) {
    super();
  }

  ngOnInit() {}

  onSubmit() {
    this.routerSrv.navigate(['/confirmacion']);
}

volver(){
  this.routerSrv.navigate(['/home']);
}

}


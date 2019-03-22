import { CotizacionModel } from './../../../../models/cotizacion.model';
import { CotizacionAutoModel } from './../../../../models/cotizacion-auto.model';
import { AnioModel } from 'src/app/models/anio.model';
import { ModeloAutoModel } from './../../../../models/modelo-auto.model';
import { MarcaAutoModel } from './../../../../models/marca-auto.model';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { Router } from '@angular/router';
import { DatosParametricosService } from 'src/app/core/services/datos-parametricos.service';
import { AppConstants } from 'src/app/utils/app-constants';
import { DdlRequiredValidator } from 'src/app/shared/validators/ddlRequired.validator';

@Component({
  selector: 'app-datos-auto',
  templateUrl: './datos-auto.component.html',
  styleUrls: ['./datos-auto.component.css']
})
export class DatosAutoComponent extends BaseComponent implements OnInit {
  form: any;
  marcasAuto: MarcaAutoModel[];
  modelosAuto: ModeloAutoModel[];
  anios: AnioModel[];

  constructor(private routerSrv: Router,
    private datosParamSrv: DatosParametricosService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.storageSrv.remove(AppConstants.KEY_STORAGE_COTIZACION);
    this.form = this.formBuilder.group({
      'marcas': ['0', DdlRequiredValidator],
      'modelos': ['0', DdlRequiredValidator],
      'anios': ['0', DdlRequiredValidator]
    });

    this.datosParamSrv.getMarcasAuto().subscribe(data => {
      this.marcasAuto = data.datos;
    },
    error => {
      console.log(error);
    }
    );

    this.datosParamSrv.getAnios().subscribe(data => {
      this.anios = data;
    },
    error => {
      console.log(error);
    }
    );
  }

  onChangeMarcasAutos(idMarca: string) {
    this.datosParamSrv.getModelosAutoPorMarca(idMarca).subscribe(data => {
      this.modelosAuto = data.datos;
    },
    error => {
      console.log(error);
    }
    );
  }

  isControlInvalid(idcontrol: string): boolean {
    const ctrl = this.form.controls[idcontrol];
    return (ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  navegar() {
    this.validateForm(this.form);
    if (this.form.valid) {
      const idMarca = this.form.get('marcas').value;
      const idModelo = this.form.get('modelos').value;
      const anio = this.form.get('anios').value;

      const cotizacionAuto: CotizacionAutoModel = {};
      cotizacionAuto.idUsuario = 1;
      cotizacionAuto.idMarca = idMarca;
      cotizacionAuto.idModelo = idModelo;
      cotizacionAuto.anio = anio;

      const cotizacion: CotizacionModel<CotizacionAutoModel> = {};
      cotizacion.cotizacion = cotizacionAuto;

      this.storageSrv.set('cot', cotizacion);

      this.routerSrv.navigateByUrl('/dasegurado');
    }
  }
}

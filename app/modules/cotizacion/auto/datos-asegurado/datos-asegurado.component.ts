import { ComunaModel } from './../../../../models/comuna.model';
import { RegionModel } from './../../../../models/region.model';
import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { Router } from '@angular/router';
import { MarcaAutoModel } from 'src/app/models/marca-auto.model';
import { ModeloAutoModel } from 'src/app/models/modelo-auto.model';
import { AnioModel } from 'src/app/models/anio.model';
import { DatosParametricosService } from 'src/app/core/services/datos-parametricos.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { CotizacionAutoModel } from 'src/app/models/cotizacion-auto.model';
import { CotizacionModel } from './../../../../models/cotizacion.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CotizacionAutoFormModel } from 'src/app/models/cotizacion-auto-form.model';
import { dateStringToISO8601, quitarTodoFormatoRut, quitarFormatoRut, parseToRutModel } from 'src/app/utils/utils';
import { DdlRequiredValidator } from 'src/app/shared/validators/ddlRequired.validator';
import { RutValidator } from 'src/app/shared/validators/rut.validator';

@Component({
  selector: 'app-datos-asegurado',
  templateUrl: './datos-asegurado.component.html',
  styleUrls: ['./datos-asegurado.component.css']
})
export class DatosAseguradoComponent extends BaseComponent implements OnInit {
  form: any;
  marcasAuto: MarcaAutoModel[];
  modelosAuto: ModeloAutoModel[];
  anios: AnioModel[];
  regiones: RegionModel[];
  comunas: ComunaModel[];

  constructor(private routerSrv: Router,
    private datosParamSrv: DatosParametricosService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.form = this.formBuilder.group({
      'marcas': ['0'],
      'modelos': ['0'],
      'anios': ['0'],
      'asegurado': new FormGroup({
        'rut': new FormControl('', [Validators.required, RutValidator]),
        'nombre': new FormControl('', Validators.required),
        'apellido': new FormControl('', Validators.required),
        'esPropietario': new FormControl(false),
        'sexo': new FormControl('0', DdlRequiredValidator),
        'fechaNacimiento': new FormControl('', Validators.required),
        'region': new FormControl('0', DdlRequiredValidator),
        'comuna': new FormControl('0', DdlRequiredValidator),
        'email': new FormControl('', Validators.required),
        'celular': new FormControl('', Validators.required)
      })
    });

     const cotizacion = <CotizacionModel<CotizacionAutoModel>>this.storageSrv.get('cot');
     if (cotizacion) {
      const cotizacionAuto = cotizacion.cotizacion;
      this.cargarCombos(cotizacionAuto);
     }
  }

  private cargarCombos(cotizacionAuto: CotizacionAutoModel) {
    forkJoin(
      this.datosParamSrv.getMarcasAuto(),
      this.datosParamSrv.getAnios(),
      this.datosParamSrv.getRegiones()
      ).subscribe(([marcas, anios, regiones]) => {
        this.marcasAuto  = marcas.datos;
        this.anios = anios;
        this.regiones = regiones.datos;
        this.posicionarCombos(cotizacionAuto);
      },
      error => {
        console.log(error);
      });
  }

  private posicionarCombos(cotizacionAuto: CotizacionAutoModel) {
    setTimeout(() => {
    this.form.controls['marcas'].setValue(cotizacionAuto.idMarca);
    this.form.controls['anios'].setValue(cotizacionAuto.anio);

    this.datosParamSrv.getModelosAutoPorMarca(cotizacionAuto.idMarca.toString()).subscribe(data => {
      this.modelosAuto = data.datos;
      this.posicionarComboModelos(cotizacionAuto.idModelo.toString());
    }, error => {
      console.log(error);
    });
    }, 500);
  }

  private posicionarComboModelos(idModelo: string) {
    setTimeout(() => {
      this.form.controls['modelos'].setValue(idModelo);
    }, 500);
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

  onRegionChange(idRegion: string) {
    this.datosParamSrv.getComunas(idRegion).subscribe(data => {
      this.comunas = data.datos;
    },
    error => {
      console.log(error);
    }
    );
  }

  onSubmit() {
    this.validateForm(this.form);
    if (this.form.valid) {
      const result: CotizacionAutoFormModel = Object.assign({}, this.form.value);
      console.log(JSON.stringify(result));

      const cotizacion = <CotizacionModel<CotizacionAutoModel>>this.storageSrv.get('cot');
      const cotizacionAuto: CotizacionAutoModel = cotizacion.cotizacion;
      cotizacionAuto.anio = Number(result.anios);
      cotizacionAuto.idMarca = Number(result.marcas);
      cotizacionAuto.idModelo = Number(result.modelos);
      cotizacionAuto.tipoUso = 100;

      const aseguradoForm = result.asegurado;
      const rutModel = parseToRutModel(aseguradoForm.rut);
      const fechaNacimientoISO8601 = dateStringToISO8601(aseguradoForm.fechaNacimiento);
      cotizacionAuto.asegurado = {
        rut: rutModel.numero,
        dv: rutModel.dv,
        nombre: aseguradoForm.nombre,
        apellido: aseguradoForm.apellido,
        esPropietario: aseguradoForm.esPropietario,
        idSexo: Number(aseguradoForm.sexo) - 1,
        fechaNacimiento: fechaNacimientoISO8601,
        idComuna: Number(aseguradoForm.comuna),
        email: aseguradoForm.email,
        celular: aseguradoForm.celular
      };
      this.storageSrv.set('cot', cotizacion);

      this.navegar();
    }
  }

  isControlInvalid(idcontrol: string): boolean {
    const ctrl = this.form.get(idcontrol);
    // const ctrl = this.form.controls[idcontrol];
    return (ctrl.invalid && (ctrl.dirty || ctrl.touched));
  }

  isRequiredValidatorError(idcontrol: string): boolean {
    const ctrl = this.form.get(idcontrol);
    return ctrl.hasError('required');
  }

  isRutValidatorError(idcontrol: string): boolean {
    const ctrl = this.form.get(idcontrol);
    return ctrl.hasError('invalidRut');
  }

  private navegar() {
    this.routerSrv.navigateByUrl('/oferta');
  }
}

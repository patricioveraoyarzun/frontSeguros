import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { CotizacionService } from 'src/app/core/services/cotizacion.service';
import { CotizacionModel } from 'src/app/models/cotizacion.model';
import { CotizacionAutoModel } from 'src/app/models/cotizacion-auto.model';
import { OfertaCotizacionModel } from 'src/app/models/oferta-cotizacion.model';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';

declare var inicializarSlider: any;

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent extends BaseComponent implements OnInit {
  formFiltros: FormGroup;
  ofertas: OfertaCotizacionModel[] = [];
  ofertasFiltradas: OfertaCotizacionModel[] = [];
  deducibles: Number[] = [];
  aseguradoras: string[] = [];

  constructor(private cotizacionSrv: CotizacionService) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    inicializarSlider();
    this.configurarFiltros();
    this.buscarOfertas();
  }

  private configurarFiltros() {
    this.formFiltros = this.formBuilder.group({
      filtroDeducibles: new FormArray([]),
      filtroAseguradoras: new FormArray([]),
      filtroRangoPrecios: new FormControl('250000')
    });
  }

  private buscarOfertas() {
    const cotizacion = <CotizacionModel<CotizacionAutoModel>>this.storageSrv.get('cot');
    if (cotizacion) {
      const cotizacionAuto = cotizacion.cotizacion;
      this.cotizacionSrv.obtenerCotizacionesAuto(cotizacionAuto).subscribe(data => {
        if (data.cotizaciones && data.cotizaciones.length > 0) {
          this.ofertas = data.cotizaciones[0].ofertasCotizacion;
          this.ofertasFiltradas = this.ofertas;

          this.cotizacionSrv.obtenerDediciblesDesdeOfertas(this.ofertas).subscribe(deducibles => {
            this.deducibles = deducibles;
            console.log('Deducibles: ' + JSON.stringify(this.deducibles));
            this.addCheckboxesFiltroDeducibles(this.deducibles);
            this.detectarCambiosFiltroDeducibles();
          });
          this.cotizacionSrv.obtenerAseguradorasDesdeOfertas(this.ofertas).subscribe(aseguradoras => {
            this.aseguradoras = aseguradoras;
            console.log('Aseguradoras: ' + JSON.stringify(this.aseguradoras));
            this.addCheckboxesFiltroAseguradoras(this.aseguradoras);
            this.detectarCambiosFiltroAseguradoras();
          });
        }
        this.detectarCambiosFiltroRangoPrecios();
      },
        error => {
          console.log(error);
        });
    }
  }

  private addCheckboxesFiltroDeducibles(deducibles: Number[]) {
    const filtroDeducibles = this.formFiltros.controls.filtroDeducibles as FormArray;
    this.addFormCotrolToFormArray(filtroDeducibles, deducibles);
  }

  private addCheckboxesFiltroAseguradoras(aseguradoras: string[]) {
    const filtroAseguradoras = this.formFiltros.controls.filtroAseguradoras as FormArray;
    this.addFormCotrolToFormArray(filtroAseguradoras, aseguradoras);
  }

  private addFormCotrolToFormArray(formArray: FormArray, array: any[]) {
    array.map((o, i) => {
      const control = new FormControl(false);
      formArray.push(control);
    });
  }

  private detectarCambiosFiltroDeducibles() {
    const filtroDeducibles: FormArray = this.formFiltros.get('filtroDeducibles') as FormArray;

    filtroDeducibles.valueChanges.subscribe((data: any[]) => {
      this.filtrarOfertas();
    });
  }

  private detectarCambiosFiltroAseguradoras() {
    const filtroAseguradoras: FormArray = this.formFiltros.get('filtroAseguradoras') as FormArray;
    filtroAseguradoras.valueChanges.subscribe(data => {
      this.filtrarOfertas();
    });
  }

  private detectarCambiosFiltroRangoPrecios() {
    const filtroRangoPrecios = this.formFiltros.get('filtroRangoPrecios');
    if (filtroRangoPrecios) {
      filtroRangoPrecios.valueChanges.pipe(
        debounceTime(1000),
        distinctUntilChanged()
       ).subscribe((data) => {
        this.filtrarOfertas();
       });
    }
  }

  private filtrarOfertas() {
    let ofertasFiltradasResult: OfertaCotizacionModel[] = this.ofertas;

    const filtroDeducibles: FormArray = this.formFiltros.get('filtroDeducibles') as FormArray;
    const filtroDeduciblesValues = filtroDeducibles.value;

    const filtroAseguradoras: FormArray = this.formFiltros.get('filtroAseguradoras') as FormArray;
    const filtroAseguradorasValues = filtroAseguradoras.value;

    const filtroFiltroPrecioValue = this.formFiltros.get('filtroRangoPrecios').value;

    const indicesDeduciblesFiltrados = this.obtenerIndicesDatosFiltrados(filtroDeduciblesValues);
    const indicesAseguradorasFiltradas = this.obtenerIndicesDatosFiltrados(filtroAseguradorasValues);

    const hayDeduciblesFiltrados = (indicesDeduciblesFiltrados && indicesDeduciblesFiltrados.length > 0);
    const hayAseguradorasFiltradas = (indicesAseguradorasFiltradas && indicesAseguradorasFiltradas.length > 0);

    if (hayDeduciblesFiltrados || hayAseguradorasFiltradas) {
      if (hayDeduciblesFiltrados) {
        const deducibles = this.deducibles.filter(d => indicesDeduciblesFiltrados.indexOf(d.valueOf()) < 0);
        ofertasFiltradasResult = ofertasFiltradasResult.filter( o => deducibles.indexOf(o.idDeducible) < 0);
      }

      if (hayAseguradorasFiltradas) {
        const aseguradoras = this.aseguradoras.filter((d: any, i: any) => indicesAseguradorasFiltradas.indexOf(i) < 0);
        ofertasFiltradasResult = ofertasFiltradasResult.filter(o => aseguradoras.indexOf(o.aseguradora.nombre) < 0);
      }
    }

    ofertasFiltradasResult = ofertasFiltradasResult.filter(p => p.valorCuota <= filtroFiltroPrecioValue);

    this.ofertasFiltradas = ofertasFiltradasResult;
  }

  private obtenerIndicesDatosFiltrados(filtros: any[]): any[] {
    return filtros.map((d: any, i: any) => {
      return d ? i : undefined;
    }).filter((f: any) => {
      return f !== undefined;
    });
  }
}

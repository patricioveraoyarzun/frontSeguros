import { AnioModel } from './../../models/anio.model';
import { ModeloAutoModel } from './../../models/modelo-auto.model';
import { MarcaAutoModel } from './../../models/marca-auto.model';
import { BaseService } from './base.service';
import { ResponseDatosParamModel } from './../../models/response-datos-param.model';
import { ComunaModel } from './../../models/comuna.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { RegionModel } from 'src/app/models/region.model';

@Injectable({
  providedIn: 'root'
})
export class DatosParametricosService extends BaseService {
  private baseUrlParam: string;

  constructor(private httpClient: HttpClient) {
    super();
    this.baseUrlParam = this.baseApiUrl.concat('core/paramdata/');
  }

  public getRegiones() {
    return this.httpClient.get<ResponseDatosParamModel<RegionModel[]>>(
      this.baseUrlParam.concat('regiones'), { responseType: 'json' })
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  public getComunas(idRegion: string) {
    return this.httpClient.get<ResponseDatosParamModel<ComunaModel[]>>(
      this.baseUrlParam.concat('regiones/' + idRegion + '/comunas') , { responseType: 'json' })
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  public getMarcasAuto() {
    return this.httpClient.get<ResponseDatosParamModel<MarcaAutoModel[]>>(
      this.baseUrlParam.concat('marcas/autos'), {  responseType: 'json' })
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  public getModelosAutoPorMarca(idMarca: string) {
    return this.httpClient.get<ResponseDatosParamModel<ModeloAutoModel[]>>(
      this.baseUrlParam.concat('marcas/' + idMarca + '/autos/modelos'), { responseType: 'json' })
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  public getAnios(): Observable<AnioModel[]>  {
    const anios: AnioModel[] = [];
    const anioFin = (new Date()).getFullYear();
    let anioModel: AnioModel;
    for (let i = 0; i < 15; i++) {
      const aniotmp = (anioFin - i);
      anioModel = {
        id: aniotmp.toString(),
        nombre: aniotmp.toString()
      };
      anios.push(anioModel);
    }

    return of(anios);
  }
}

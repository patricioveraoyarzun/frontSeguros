import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { CotizacionAutoModel } from 'src/app/models/cotizacion-auto.model';
import { map } from 'rxjs/operators';
import { CotizacionAutoResponseModel } from 'src/app/models/cotizacion-auto-response.model';
import { OfertaCotizacionModel } from 'src/app/models/oferta-cotizacion.model';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService extends BaseService {
  private baseUrlParam: string;

  constructor(private httpClient: HttpClient) {
    super();
    this.baseUrlParam = this.baseApiUrl.concat('cotizacion/auto');
  }

  public obtenerCotizacionesAuto(cotizacionAuto: CotizacionAutoModel) {
    return this.httpClient.post<CotizacionAutoResponseModel>(
      this.baseUrlParam, cotizacionAuto, { responseType: 'json' })
      .pipe(
        map(data => {
          return data;
        })
      );
  }

  public obtenerDediciblesDesdeOfertas(ofertas: OfertaCotizacionModel[]): Observable<number[]> {
    const deduciles = ofertas
    .map((oferta) => oferta.idDeducible)
    .filter((elem, index, self) => index === self.indexOf(elem))
    .sort((a, b) => a - b);
    return of(deduciles);
  }

  public obtenerAseguradorasDesdeOfertas(ofertas: OfertaCotizacionModel[]): Observable<string[]> {
    const aseguradoras = ofertas
    .map((oferta) => oferta.aseguradora.nombre)
    .filter((elem, index, self) => index === self.indexOf(elem))
    .sort((a, b) => a !== b ? a < b ? -1 : 1 : 0);
    return of(aseguradoras);
  }
}

import { OfertaCotizacionModel } from './oferta-cotizacion.model';

export interface CotizacionAutoResultModel {
  id?: number;
  idEntidadProveedoraSrv?: number;
  ofertasCotizacion?: OfertaCotizacionModel[];
}

import { AseguradoraModel } from './aseguradora.model';
import { ProductoModel } from './producto.model';
export interface OfertaCotizacionModel {
  aseguradora?: AseguradoraModel;
  producto?: ProductoModel;
  idDeducible?: number;
  primaAfecta?: number;
  primaExcenta?: number;
  primaBruta?: number;
  iva?: number;
  nroCuotas?: number;
  valorCuota?: number;
}

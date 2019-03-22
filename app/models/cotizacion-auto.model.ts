import { AseguradoModel } from './asegurado.model';
export interface CotizacionAutoModel {
  idUsuario?: number;
  idMarca?: number;
  idModelo?: number;
  anio?: number;
  tipoUso?: number;
  asegurado?: AseguradoModel;
}

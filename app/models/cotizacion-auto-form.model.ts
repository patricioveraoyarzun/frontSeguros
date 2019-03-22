import { AseguradoFormModel } from './asegurado-form.model';
export interface CotizacionAutoFormModel {
  marcas?: string;
  modelos?: string;
  anios?: string;
  asegurado?: AseguradoFormModel;
}

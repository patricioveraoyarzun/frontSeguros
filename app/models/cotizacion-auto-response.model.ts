import { CotizacionAutoResultModel } from './cotizacion-auto-result.model';
import { HeaderResponseModel } from './header-response.model';
export interface CotizacionAutoResponseModel {
  header: HeaderResponseModel;
  cotizaciones: CotizacionAutoResultModel[];
}

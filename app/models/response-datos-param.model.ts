import { HeaderResponseModel } from './header-response.model';
export interface ResponseDatosParamModel<TDato> {
  header?: HeaderResponseModel;
  datos?: TDato;
}

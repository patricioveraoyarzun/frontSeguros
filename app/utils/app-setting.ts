import { environment } from 'src/environments/environment';

export class AppSetting {
  static isProduction(): boolean {
    return environment.production;
  }

  static getAPIEndpoint(): string {
    return environment.APIEndpoint;
  }

  static getValidarSesion(): boolean {
    return environment.validarSesion;
  }

  static enableDebug(): boolean {
    return environment.enableDebug;
  }

  static getAPIEndpointAuth(): string {
    return environment.APIEndpointAuth;
  }
}

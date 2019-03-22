import { AppSetting } from 'src/app/utils/app-setting';

export class BaseService {
  private _baseApiUrl: string;
  private _baseApiUrlAuth: string;

  constructor() {
    this.baseApiUrl = AppSetting.getAPIEndpoint();
    this.baseApiUrlAuth = AppSetting.getAPIEndpointAuth();
  }
  protected get baseApiUrl(): string {
    return this._baseApiUrl;
  }

  protected set baseApiUrl(value: string) {
    this._baseApiUrl = value;
  }
  protected get baseApiUrlAuth(): string {
    return this._baseApiUrlAuth;
  }

  protected set baseApiUrlAuth(value: string) {
    this._baseApiUrlAuth = value;
  }
}

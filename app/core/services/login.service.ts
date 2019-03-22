import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { StorageService } from './storage/storage.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService extends BaseService {
  private baseUrlParam: string;

  constructor(private httpClient: HttpClient,
    private storageSrv: StorageService) {
    super();
    this.baseUrlParam = this.baseApiUrlAuth.concat('auth');
   }

   public autorizarDeprecado(usuario: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json;'});

    this.httpClient.post(this.baseUrlParam, usuario, { headers, observe: 'response' })
      .subscribe((response) => {

            let token = response.headers.get('Authorization');
            if (token.startsWith('Bearer ')) {
              token = token.slice(7, token.length).trim();
            }
            console.log(token);
            this.storageSrv.guardarToken(token);

      });
  }


  public autorizar(usuario: any) {
    const headers = new HttpHeaders({'Content-Type': 'application/json;'});
    return this.httpClient.post(this.baseUrlParam, usuario, { headers, observe: 'response' })
      .pipe(
        map(response => {
            let token = response.headers.get('Authorization');
            if (token.startsWith('Bearer ')) {
              token = token.slice(7, token.length).trim();
            }
            console.log(token);
            this.storageSrv.guardarToken(token);
        })
      );
  }

  logout() {
    this.storageSrv.eliminarToken();
  }

}

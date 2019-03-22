import { Injectable } from '@angular/core';
import { LocalStorageService } from 'ngx-store';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private localStorageSrv: LocalStorageService) { }

  set(key: string, value: any): void {
    this.localStorageSrv.set(key, value);
  }

  get(key: string) {
    return  this.localStorageSrv.get(key);
  }

  remove(key: string): void {
    this.localStorageSrv.remove(key);
  }

  clear(): void {
    this.localStorageSrv.clear('all');
  }

  guardarToken(token: string) {
    this.localStorageSrv.set('token', token);
  }

  eliminarToken() {
    this.localStorageSrv.remove('token');
  }

}

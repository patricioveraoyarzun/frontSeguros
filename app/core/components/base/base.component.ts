import { StorageService } from './../../services/storage/storage.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AppInjector } from 'src/app/utils/app-injector';
import { validateAllFormFields } from 'src/app/utils/utils';

declare var $: any;

@Component({
  template: ``
})
export class BaseComponent implements OnInit, AfterViewInit {

    // Servicios
  protected formBuilder: FormBuilder;
  protected storageSrv: StorageService;

  constructor() { }

  ngOnInit() {
    const injector = AppInjector.getInjector();
    this.formBuilder = injector.get(FormBuilder);
    this.storageSrv =  injector.get(StorageService);
  }

  ngAfterViewInit(): void {
    // Se inicializa BMD
    $('form').bootstrapMaterialDesign();
  }

  validateForm(formGroup: FormGroup): void {
    validateAllFormFields(formGroup);
  }
}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base/base.component';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor() {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngAfterViewInit(): void {
    $.getScript('assets/js/master.js');
  }

}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base/base.component';

declare var $: any;

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $.getScript('assets/js/master.js');
  }

}

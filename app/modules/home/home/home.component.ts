import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BaseComponent } from 'src/app/core/components/base/base.component';

declare var $: any;

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  extends BaseComponent implements OnInit, AfterViewInit {

  constructor() {
    super();
   }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    $.getScript('assets/js/master.js');
  }
}

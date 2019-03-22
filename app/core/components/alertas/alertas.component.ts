import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AlertasService } from 'src/app/core/services/alertas.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.css']
})
export class AlertasComponent implements  OnInit {

  private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertasService) { }

    ngOnInit() {
        this.subscription = this.alertService.getMessage().subscribe(message => {
            this.message = message;
        });
    }
    setMessage(message: String){
      this.message = message;
    }

}

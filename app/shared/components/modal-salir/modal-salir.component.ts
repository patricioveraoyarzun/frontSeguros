import { Component, OnInit } from '@angular/core';
import { LoginService} from 'src/app/core/services/login.service';
import { Router } from '@angular/router';

declare var $: any;
@Component({
  selector: 'app-modal-salir',
  templateUrl: './modal-salir.component.html',
  styleUrls: ['./modal-salir.component.css']
})
export class ModalSalirComponent implements OnInit {

  constructor(private loginService: LoginService, private routerSrv: Router) { }

  ngOnInit() {
  }

  salir() {
    close();
    this.loginService.logout();
    this.routerSrv.navigate(['/login']);
  }

  close() {
    $('.modalSalir').modal('hide');
}

}

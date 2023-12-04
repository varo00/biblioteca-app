import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-historial-prestamos',
  templateUrl: './historial-prestamos.page.html',
  styleUrls: ['./historial-prestamos.page.scss'],
})
export class HistorialPrestamosPage implements OnInit {

  historial:any[];

  constructor(
    private authSvc : AuthService,
    private prestamoSvc : PrestamoService,
  ) {
    this.prestamoSvc.getHistorial(`usuarios/${this.authSvc.currentUser.uid}/historialPrestamos`).subscribe( res => {
      this.historial = res;
    })
  }

  ngOnInit() {
  }

}

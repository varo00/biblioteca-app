import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from 'src/app/interfaces/libro';
import { Prestamo } from 'src/app/interfaces/prestamo';
import { AuthService } from 'src/app/services/auth.service';
import { LibrosService } from 'src/app/services/libros.service';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-ver-prestamos-pendientes',
  templateUrl: './ver-prestamos-pendientes.page.html',
  styleUrls: ['./ver-prestamos-pendientes.page.scss'],
})
export class VerPrestamosPendientesPage implements OnInit {

  prestamos : Prestamo[];

  constructor(
    private prestamoSvc : PrestamoService,
    private authSvc : AuthService,
    private libroSvc : LibrosService,
  ) {
    this.prestamoSvc.getPrestamos(`usuarios/${this.authSvc.currentUser.uid}/prestamos`).subscribe(res => {
      this.prestamos = res;
    });
  }

  ngOnInit() {
  }

}

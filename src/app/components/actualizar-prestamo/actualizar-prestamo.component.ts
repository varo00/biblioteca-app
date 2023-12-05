import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Prestamo } from 'src/app/interfaces/prestamo';
import { AuthService } from 'src/app/services/auth.service';
import { LibrosService } from 'src/app/services/libros.service';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-actualizar-prestamo',
  templateUrl: './actualizar-prestamo.component.html',
  styleUrls: ['./actualizar-prestamo.component.scss'],
})
export class ActualizarPrestamoComponent  implements OnInit {
  @Input() 
  prestamo : Prestamo;

  constructor(
    private authSvc : AuthService,
    private prestamoSvc : PrestamoService,
    private libroSvc : LibrosService,
    private loadingCtrl : LoadingController,
    private modalCtrl : ModalController
  ) {}
  
  ngOnInit() {
    console.log(this.prestamo);
  }

}

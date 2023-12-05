import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PrestamoService } from 'src/app/services/prestamo.service';
import Swal from 'sweetalert2';
import { LoadingController } from '@ionic/angular';

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
    private loadingCtrl : LoadingController
  ) {
    this.prestamoSvc.getHistorial(`usuarios/${this.authSvc.currentUser.uid}/historialPrestamos`).subscribe( res => {
      this.historial = res;
    })
  }

  ngOnInit() {
  }

  async eliminar(p:any){
    let path = `usuarios/${this.authSvc.currentUser.uid}/historialPrestamos/${p.doc}`;

    const loading = await this.loadingCtrl.create({
      spinner: 'circular',
      mode: 'ios'
    });
    await loading.present();

    this.prestamoSvc.deleteRegistroHistorial(path).then(() => {
      loading.dismiss();
      const exitoToast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });
      exitoToast.fire({
        icon: 'success',
        title: 'Préstamo eliminado del historial',
      });
    });
  }

  confirmarEliminar(p){
    Swal.fire({
      title: '¿Quieres eliminar este registro del historial?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      heightAuto: false,
      backdrop: false,
    }).then((result) => {
      if(result.isConfirmed){
        this.eliminar(p);
      }
    });
  }

}

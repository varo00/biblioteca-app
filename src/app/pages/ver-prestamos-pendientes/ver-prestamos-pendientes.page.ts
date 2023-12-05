import { Component, OnInit, ViewChild } from '@angular/core';
import { IonItemOptions, IonItemSliding, LoadingController, ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { ActualizarPrestamoComponent } from 'src/app/components/actualizar-prestamo/actualizar-prestamo.component';
import { Prestamo } from 'src/app/interfaces/prestamo';
import { AuthService } from 'src/app/services/auth.service';
import { LibrosService } from 'src/app/services/libros.service';
import { PrestamoService } from 'src/app/services/prestamo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ver-prestamos-pendientes',
  templateUrl: './ver-prestamos-pendientes.page.html',
  styleUrls: ['./ver-prestamos-pendientes.page.scss'],
})
export class VerPrestamosPendientesPage implements OnInit {
  @ViewChild(IonItemSliding) devolver !: IonItemSliding;

  prestamos : Prestamo[];

  constructor(
    private prestamoSvc : PrestamoService,
    private authSvc : AuthService,
    private libroSvc : LibrosService,
    private loadingCtrl : LoadingController,
    private modalCtrl : ModalController
  ) {
    this.prestamoSvc.getPrestamos(`usuarios/${this.authSvc.currentUser.uid}/prestamos`).subscribe(res => {
      this.prestamos = res;
    });
  }

  ngOnInit() {
  }

  async marcarDevuelto(p:Prestamo){
    await Swal.fire({
      title: '¿Marcar préstamo como devuelto?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      heightAuto: false,
      backdrop: false,
    }).then((result) => {
      //marcar prestamo como devuelto
      if(result.isConfirmed){
        this.devolverPrestamo(p);
      }
    }).catch(err => {
      console.log(err);
    }).finally(() => { 
      this.devolver.closeOpened()
    });
  }

  async devolverPrestamo(p:Prestamo){
    let hisPrest;

    const loading = await this.loadingCtrl.create({
      spinner: 'circular',
      mode: 'ios'
    });
    await loading.present();

    this.libroSvc.updateLibro(`usuarios/${this.authSvc.currentUser.uid}/libros/${p.libro}`, {prestado:false}).then(() => {
      hisPrest = {libro:p.titulo, prestado_a:p.prestado_a, devuelto:format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z'}

      this.prestamoSvc.devolverPrestamo(`usuarios/${this.authSvc.currentUser.uid}/historialPrestamos`,hisPrest).then(() => {
        this.prestamoSvc.deletePrestamo(`usuarios/${this.authSvc.currentUser.uid}/prestamos/${p.doc}`);
      });
    }).finally(() => {
      loading.dismiss();
    });

  }

  async eliminarPrestamo(p:Prestamo){
    const exitoToast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });

    const loading = await this.loadingCtrl.create({
      spinner: 'circular',
      mode: 'ios'
    });

    await loading.present();

    this.libroSvc.updateLibro(`usuarios/${this.authSvc.currentUser.uid}/libros/${p.libro}`, {prestado:false}).then(() => {
      this.prestamoSvc.deletePrestamo(`usuarios/${this.authSvc.currentUser.uid}/prestamos/${p.doc}`).then(() => {

        exitoToast.fire({
          icon: 'success',
          title: '¡Préstamo eliminado con éxito!',
        });

        loading.dismiss();
      })
    });

  }

  async confirmarEliminarPrestamo(p:Prestamo){
    await Swal.fire({
      title: 'Quieres eliminar este préstamo?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      heightAuto: false,
      backdrop: false,
    }).then((result) => {
      if(result.isConfirmed){
        this.eliminarPrestamo(p);
      }else{
        this.devolver.closeOpened();
      }
    });
  }

  async abrirPrestamo(prestamo:Prestamo) {
    const modal = await this.modalCtrl.create({
      component: ActualizarPrestamoComponent,
      componentProps: { prestamo : prestamo },
      breakpoints: [0, 0.5, 0.8, 1],
      initialBreakpoint: 0.8,
      backdropDismiss: true,
    });

    modal.present();
  }
}

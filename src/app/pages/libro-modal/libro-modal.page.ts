import { Component, OnInit, Input } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Libro } from 'src/app/interfaces/libro';
import { LibrosService } from 'src/app/services/libros.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-libro-modal',
  templateUrl: './libro-modal.page.html',
  styleUrls: ['./libro-modal.page.scss'],
})
export class LibroModalPage implements OnInit {
  @Input() id : string

  libro : Libro;

  constructor(
    private libroService : LibrosService,
    private modalCtrl : ModalController,
    private alertCtrl : AlertController,
  ) { }

  ngOnInit() {
    this.libroService.getLibroById(this.id).subscribe( res => {
      this.libro = res;
    });
  }

  habilitarEdicion(){
    const inputHTML = document.getElementsByClassName('elem');
    const btn = document.getElementById('btnEditar');

    btn.removeAttribute('disabled');

    for (let i = 0; i < inputHTML.length; i++) {
      const el = inputHTML[i];
      el.removeAttribute('disabled');
    }
  }

  deshabilitarEdicion(){
    const inputHTML = document.getElementsByClassName('elem');
    const btn = document.getElementById('btnEditar');

    btn.setAttribute('disabled', 'true');

    for (let i = 0; i < inputHTML.length; i++) {
      const el = inputHTML[i];
      el.setAttribute('disabled', 'true');
    }
  }

  async actualizarLibro(){
    if(this.libro.autor !== '' && this.libro.titulo !== ''){
      this.libroService.updateLibro(this.libro);
  
      const Toast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      })
  
      this.deshabilitarEdicion();
      Toast.fire({
        icon: 'success',
        title: '¡Libro actualizado!'
      })
    }else{
      const alert = await this.alertCtrl.create({
        message: 'Tienes campos sin rellenar',
        backdropDismiss: false,
        buttons: ['ok'],
        mode: 'ios'
      });

      alert.present();
    }
  }

  borrarLibro(){
    Swal.fire({
      title: '¿Desea borrar el libro?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      heightAuto: false,
      backdrop: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.libroService.deleteLibro(this.libro);
        this.modalCtrl.dismiss();
      }
    }).catch(err => {
      console.log(err);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { LibrosService } from '../../services/libros.service';
import { Libro } from '../../interfaces/libro';
import { IonModal, ModalController } from '@ionic/angular';
import { Usuario } from '../../interfaces/usuario';
import { initializeApp } from '@angular/fire/app';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  libros: Libro[] = [];
  userLoggeado: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router,
    private libroService: LibrosService,
    private usuarioService: UsuarioService,
    private modalCtrl: ModalController
  ) {

    this.usuarioService.getUsusarios().subscribe(usuarios => {
      usuarios.forEach(u => {
        if (u['id'] === this.authService.currentUser.uid) {
          this.userLoggeado = u;
          console.log(this.userLoggeado);
        }
      });
    });

  }

  ngOnInit(): void {
    this.libroService.getLibros().subscribe( res => {
      this.libros = res.filter(lib => lib['usuario'] === this.authService.currentUser.uid);
    });
  }

  async logout() {
    Swal.fire({
      title: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar',
      heightAuto: false,
      backdrop: false,
    }).then((result) => {

      if (result.isConfirmed) {
        this.authService.logout().then(() => {
          this.router.navigate(['/']);
        });
      }

    }).catch(err => {
      console.log(err);
    })

  }

  async abrirLibro(libro) {
    const modal = await this.modalCtrl.create({
      component: IonModal,
      componentProps: { id: libro.id },
      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.3,
      backdropDismiss: true,
    });

    modal.present();
  }

  anadirNota(){

  }

}

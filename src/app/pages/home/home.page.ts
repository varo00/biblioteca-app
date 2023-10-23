import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { LibrosService } from '../../services/libros.service';
import { Libro } from '../../interfaces/libro';
import {  MenuController, ModalController } from '@ionic/angular';
import { Usuario } from '../../interfaces/usuario';
import { LibroModalPage } from '../libro-modal/libro-modal.page';

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
    private modalCtrl: ModalController,
    private menuCtrl : MenuController
  ) {

    this.usuarioService.getUsusarios().subscribe(usuarios => {
        this.userLoggeado = usuarios.filter(u => u['id'] === this.authService.currentUser.uid)[0];
        console.log(this.userLoggeado);
    });

  }

  ngOnInit(): void {
    this.libroService.getLibros().subscribe( res => {
      this.libros = res.filter(lib => lib['usuario'] === this.authService.currentUser.uid);
    });
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(true, 'first');
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
      component: LibroModalPage,
      componentProps: { id: libro.doc },
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.5,
      backdropDismiss: true,
    });

    modal.present();
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { LibrosService } from '../../services/libros.service';
import { Libro } from '../../interfaces/libro';
import { MenuController, ModalController } from '@ionic/angular';
import { AnadirLibroPage } from '../anadir-libro/anadir-libro.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  libros: Libro[] = [];
  path = `usuarios/${this.authService.currentUser.uid}/libros`;


  constructor(
    private authService: AuthService,
    private router: Router,
    private libroService: LibrosService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,
  ) {
    this.ordenarLibrosAlfabeticamente();
  }

  ngOnInit(): void {

    this.libroService.getLibros(this.path).subscribe( res => {
      this.libros = res;
      this.ordenarLibrosAlfabeticamente();
    });
  }

  ordenarLibrosAlfabeticamente() {
    this.libros = this.libros.sort((a, b) => {
      const tituloA = a.titulo.toLowerCase();
      const tituloB = b.titulo.toLowerCase();
      return tituloA.localeCompare(tituloB);
    });
  }


  ionViewWillEnter() {
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
          this.router.navigate(['']);
        });
      }

    }).catch(err => {
      console.log(err);
    })

  }

  async abrirLibro(libro) {
    const modal = await this.modalCtrl.create({
      component: AnadirLibroPage,
      componentProps: { libro: libro },
      breakpoints: [0, 0.5, 0.8, 1],
      initialBreakpoint: 0.8,
      backdropDismiss: true,
    });

    modal.present();
  }

  handleInput(event){
    const query = event.target.value.toLowerCase();
    this.libroService.getLibros(this.path).subscribe(res => {
      this.libros = res.filter((d) => d.titulo.toLowerCase().indexOf(query) > -1);
    });
  }
}

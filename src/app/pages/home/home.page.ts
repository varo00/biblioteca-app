import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import { LibrosService } from '../../services/libros.service';
import { Libro } from '../../interfaces/libro';
import { MenuController, ModalController } from '@ionic/angular';
import { Usuario } from '../../interfaces/usuario';
import { LibroModalPage } from '../libro-modal/libro-modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  libros: Libro[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
    private libroService: LibrosService,
    private modalCtrl: ModalController,
    private menuCtrl: MenuController,
  ) {

    console.log(this.authService.currentUser.uid);

    let path = `usuarios/${this.authService.currentUser.uid}/libros`;
    
    this.libroService.getLibros(path).subscribe( res => {
      this.libros = res;
    });
  }

  ngOnInit(): void {
    
  }

  ordenarLibrosAlfabeticamente() {
    this.libros = this.libros.sort((a, b) => {
      const tituloA = a.titulo.toLowerCase();
      const tituloB = b.titulo.toLowerCase();
      return tituloA.localeCompare(tituloB);
    });
  }

  /*
      Al entrar aqui desde una pagina donde el menu está deshabilitado
      tengo que volverlo a activar porque si no lo hago no aparece el icono
      hasta que la página se recargue
  */
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
      component: LibroModalPage,
      componentProps: { libro: libro },
      breakpoints: [0, 0.5, 0.8, 1],
      initialBreakpoint: 0.8,
      backdropDismiss: true,
    });

    modal.present();
  }

  // handleInput(event){
  //   const query = event.target.value.toLowerCase();

  //   this.libroService.getLibros().subscribe(res => {
  //     const aux = res.filter(lib => lib['usuario'] === this.authService.currentUser.uid);
  //     this.libros = aux.filter((d) => d.titulo.toLowerCase().indexOf(query) > -1);
  //   });
  // }

}

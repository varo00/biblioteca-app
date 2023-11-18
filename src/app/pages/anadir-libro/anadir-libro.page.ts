import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { Libro } from 'src/app/interfaces/libro';
import { AuthService } from 'src/app/services/auth.service';
import { LibrosService } from 'src/app/services/libros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anadir-libro',
  templateUrl: './anadir-libro.page.html',
  styleUrls: ['./anadir-libro.page.scss'],
})
export class AnadirLibroPage implements OnInit {

  @Input() libro: Libro;

  addBookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private libroService: LibrosService,
    private router: Router,
    private modalCtrl: ModalController,
    private loadingCtrl : LoadingController,
  ) { }

  ngOnInit() {

    this.addBookForm = this.fb.group({
      titulo: ['', [Validators.required]],
      autor: ['', [Validators.required]],
      comentario: [''],
      leido: [false, [Validators.required]],
      imagen: [''],
    });

    if (this.libro) {
      this.addBookForm.setValue(this.libro);
    }
  }

  async onSubmit() {
    this.libro ? this.updateLibro() : this.createLibro();
  }

  async createLibro() {
    let path = `usuarios/${this.authService.currentUser.uid}/libros`;

    const loading = await this.loadingCtrl.create({
      spinner: 'circular'
    });
    await loading.present();

    if(this.addBookForm.controls['imagen'].value){
      // subir la imagen y obtener la url
      let dataUrl = this.addBookForm.value['imagen'];
      let imagenPath = `${this.authService.currentUser.uid}/libros/${Date.now()}`;
      let imagenUrl = await this.libroService.uploadImage(imagenPath, dataUrl);
      this.addBookForm.controls['imagen'].setValue(imagenUrl);
    }

    this.libroService.anadirLibro(this.addBookForm.value, path).then(() => {
      const exitoToast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      loading.dismiss();

      exitoToast.fire({
        icon: 'success',
        title: '¡Nuevo libro en tu biblioteca!',
      });

      this.router.navigate(['/home']);
    }).catch(() => {
      loading.dismiss();
      console.log('error al añadir un libro');
    });
  }

  async updateLibro() {
    let path = `usuarios/${this.authService.currentUser.uid}/libros/${this.libro.doc}`;

    if (this.addBookForm.value['imagen'] !== this.libro.imagen) {
      // subir la imagen y obtener la url
      let dataUrl = this.addBookForm.value['imagen'];
      let imagenPath = await this.libroService.getFilePath(this.libro.imagen) || `${this.authService.currentUser.uid}/libros/${Date.now()}`;
      let imagenUrl = await this.libroService.uploadImage(imagenPath, dataUrl);
      this.addBookForm.controls['imagen'].setValue(imagenUrl);
    }

    const loading = await this.loadingCtrl.create({
      spinner: 'circular'
    });
    await loading.present();


    this.libroService.updateLibro(path, this.addBookForm.value).then(() => {
      const exitoToast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      exitoToast.fire({
        icon: 'success',
        title: 'Libro actualizado exitosamente',
      });

      this.loadingCtrl.dismiss();
      this.modalCtrl.dismiss();
    }).catch(() => {
      console.log('error al actualizar un libro');
    });
  }

  async deleteLibro() {
    let path = `usuarios/${this.authService.currentUser.uid}/libros/${this.libro.doc}`;

    if(this.libro.imagen){
      let imagenPath = await this.libroService.getFilePath(this.libro.imagen);
      await this.libroService.deleteFile(imagenPath);
    }

    this.libroService.deleteLibro(path).then(() => {
      this.modalCtrl.dismiss();

      const exitoToast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      exitoToast.fire({
        icon: 'success',
        title: 'Libro eliminado exitosamente',
      });

    }).catch(() => {
      console.log('error al eliminar un libro');
    });
  }

  async confirmarEliminarLibro(){
    Swal.fire({
      title: 'Quieres eliminar este libro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      heightAuto: false,
      backdrop: false,
    }).then((result) => {
      if(result.isConfirmed){
        this.deleteLibro();
      }
    });
  }

  async takeImage() {
    const dataUrl = (await this.libroService.takePicture()).dataUrl;
    this.addBookForm.controls['imagen'].setValue(dataUrl);
  }

}

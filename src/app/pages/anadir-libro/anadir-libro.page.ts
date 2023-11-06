import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
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

  @Input() libro : Libro;

  addBookForm : FormGroup;

  constructor(
    private fb : FormBuilder,
    private authService : AuthService,
    private libroService : LibrosService,
    private router : Router,
    private modalCtrl : ModalController,
  ) { }

  ngOnInit() {

    this.addBookForm = this.fb.group({
      titulo : ['', [Validators.required]],
      autor : ['', [Validators.required]],
      comentario: [''],
      leido : [false, [ Validators.required]],
      imagen : ['', [Validators.required]],
    });

    if(this.libro){
      this.addBookForm.setValue(this.libro);
    }
  }

  async onSubmit(){
    if(this.libro){
      this.updateProduct();
    }else{
      this.createProduct();
    }
  }

  async createProduct(){
    let path = `usuarios/${this.authService.currentUser.uid}/libros`;

    // subir la imagen y obtener la url
    let dataUrl = this.addBookForm.value['imagen'];
    let imagenPath = `${this.authService.currentUser.uid}/libros/${Date.now()}`;
    let imagenUrl = await this.libroService.uploadImage(imagenPath, dataUrl);
    this.addBookForm.controls['imagen'].setValue(imagenUrl);



    this.libroService.anadirLibro(this.addBookForm.value, path).then(() => {
      const exitoToast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });

      exitoToast.fire({
        icon: 'success',
        title: '¡Nuevo libro en tu biblioteca!',
      });

      this.router.navigate(['/home']);
    }).catch(() => {
      console.log('error al añadir un libro');
    });
  }

  async updateProduct(){
    let path = `usuarios/${this.authService.currentUser.uid}/libros/${this.libro.doc}`;

    if(this.addBookForm.value['imagen'] !== this.libro.imagen){
      // subir la imagen y obtener la url
      let dataUrl = this.addBookForm.value['imagen'];
      let imagenPath = await this.libroService.getFilePath(this.libro.imagen);
      let imagenUrl = await this.libroService.uploadImage(imagenPath, dataUrl);
      this.addBookForm.controls['imagen'].setValue(imagenUrl);
    }



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
        title: 'Producto actualizado exitosamente',
      });

      this.modalCtrl.dismiss();
    }).catch(() => {
      console.log('error al añadir un libro');
    });
  }

  async takeImage(){
    console.log('take picture');
    const dataUrl = (await this.libroService.takePicture()).dataUrl;
    this.addBookForm.controls['imagen'].setValue(dataUrl);
  }

}

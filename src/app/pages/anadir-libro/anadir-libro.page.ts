import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { LibrosService } from 'src/app/services/libros.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anadir-libro',
  templateUrl: './anadir-libro.page.html',
  styleUrls: ['./anadir-libro.page.scss'],
})
export class AnadirLibroPage implements OnInit {
  addBookForm : FormGroup;

  constructor(
    private fb : FormBuilder,
    private authService : AuthService,
    private libroService : LibrosService,
    private router : Router
  ) { }

  ngOnInit() {

    this.addBookForm = this.fb.group({
      titulo : ['', [Validators.required]],
      autor : ['', [Validators.required]],
      comentario: [''],
      leido : [false, [ Validators.required]],
      imagen : ['', [Validators.required]],
    });
  }

  async onSubmit(){
    let path = `usuarios/${this.authService.currentUser.uid}/libros`;

    // subir la imagen y obtener la url
    let dataUrl = this.addBookForm.value['imagen'];
    let imagenPath = `${this.authService.currentUser.uid}/${Date.now()}`;
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

  async takeImage(){
    console.log('take picture');
    const dataUrl = (await this.libroService.takePicture()).dataUrl;
    this.addBookForm.controls['imagen'].setValue(dataUrl);
  }

}

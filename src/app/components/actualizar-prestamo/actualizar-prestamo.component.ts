import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController } from '@ionic/angular';
import { format } from 'date-fns';
import { Libro } from 'src/app/interfaces/libro';
import { Prestamo } from 'src/app/interfaces/prestamo';
import { AuthService } from 'src/app/services/auth.service';
import { LibrosService } from 'src/app/services/libros.service';
import { PrestamoService } from 'src/app/services/prestamo.service';

@Component({
  selector: 'app-actualizar-prestamo',
  templateUrl: './actualizar-prestamo.component.html',
  styleUrls: ['./actualizar-prestamo.component.scss'],
})
export class ActualizarPrestamoComponent implements OnInit {
  @Input()
  prestamo: Prestamo;

  libros: Libro[];

  actualizarForm: FormGroup;

  mostrar = false;

  hoy;

  constructor(
    private authSvc: AuthService,
    private prestamoSvc: PrestamoService,
    private libroSvc: LibrosService,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private fb: FormBuilder,
  ) {
    this.libroSvc.getLibros(`usuarios/${this.authSvc.currentUser.uid}/libros`).subscribe(res => {
      this.libros = res.filter(lib => !lib.prestado);
    });

    this.hoy = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
  }

  ngOnInit() {
    console.log(this.prestamo);
    this.actualizarForm = this.fb.group({
      fecha: [this.prestamo.fecha, [Validators.required]],
      libro: [this.prestamo.libro, [Validators.required]],
      prestado_a: [this.prestamo.prestado_a, [Validators.required]],
      titulo: [this.prestamo.titulo, [Validators.required]],
    });

    let cal = document.getElementById('datetime');
    console.log('calendario: ', cal);
  }

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  cambioFecha(value) {
    this.actualizarForm.controls['fecha'].setValue(value);
  }

  obtenerTitulo() {
    this.libroSvc.getLibroById(this.actualizarForm.get('libro').value).subscribe(res => {
      this.actualizarForm.get('titulo').setValue(res.titulo);
    });
  }

  async onSubmit() {
    let pathPr = `usuarios/${this.authSvc.currentUser.uid}/prestamos/${this.prestamo.doc}`;
    let pathLib = `usuarios/${this.authSvc.currentUser.uid}/libros/`;

    const loading = await this.loadingCtrl.create({
      spinner: 'circular',
      mode: 'ios',
    });
    await loading.present();

    this.libroSvc.updateLibro(pathLib + this.prestamo.libro, { prestado: false }).then(() => {
      this.libroSvc.updateLibro(pathLib + this.actualizarForm.controls['libro'].value, { prestado: true }).then(() => {
        this.prestamoSvc.updatePrestamo(pathPr, this.actualizarForm.value).then(() => {
          console.log('prestamo actualizado');
          this.modalCtrl.dismiss();
          loading.dismiss();
        });
      });
    });


  }

  mostrarOcultarSelect() {
    this.mostrar = !this.mostrar;
  }

}

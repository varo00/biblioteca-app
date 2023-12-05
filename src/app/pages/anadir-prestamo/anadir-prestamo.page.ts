import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonDatetime, LoadingController } from '@ionic/angular';
import { format, parseISO } from 'date-fns';
import { Libro } from 'src/app/interfaces/libro';
import { AuthService } from 'src/app/services/auth.service';
import { LibrosService } from 'src/app/services/libros.service';
import { PrestamoService } from 'src/app/services/prestamo.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-anadir-actualizar-prestamo',
  templateUrl: './anadir-prestamo.page.html',
  styleUrls: ['./anadir-prestamo.page.scss'],
})
export class AnadirActualizarPrestamoPage implements OnInit {
  @ViewChild(IonDatetime) datetime!: IonDatetime;

  showPicker = false;
  dateValue;
  hoy;
  formattedString = '';

  libros: Libro[]

  prestamoForm: FormGroup;

  constructor(
    private authSvc: AuthService,
    private libroSvc: LibrosService,
    private prestamoSvc: PrestamoService,
    private loadingCtrl: LoadingController,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.dateValue = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
    this.hoy = format(new Date(), 'yyyy-MM-dd') + 'T09:00:00.000Z';
    this.setToday();

    this.libroSvc.getLibros(`usuarios/${this.authSvc.currentUser.uid}/libros`).subscribe(async res => {
      this.libros = res.filter(l => !l.prestado);
    });
  }

  ngOnInit() {
    this.prestamoForm = this.fb.group({
      fecha: [this.dateValue, [Validators.required]],
      libro: ['', [Validators.required]],
      prestado_a: ['', [Validators.required]],
      titulo: ['', [Validators.required]],
    });
  }

  setToday() {
    this.formattedString = format(parseISO(this.dateValue), 'd / MMM / yyyy');
  }

  dateChanged(value: any) {
    this.dateValue = value;
    this.formattedString = format(parseISO(value), 'd / MMM / yyyy');
    this.showPicker = false;
    this.prestamoForm.controls['fecha'].setValue(this.dateValue);
  }

  close() {
    this.datetime.cancel(true);
  }

  select() {
    this.datetime.confirm(true);
  }

  obtenerTitulo(){
    this.libroSvc.getLibroById(this.prestamoForm.get('libro').value).subscribe( res => {
      this.prestamoForm.get('titulo').setValue(res.titulo);
    });
  }

  async onSubmit() {

    const loading = await this.loadingCtrl.create({
      spinner: 'circular',
      mode: 'ios'
    });

    await loading.present();



    this.libroSvc.updateLibro(`usuarios/${this.authSvc.currentUser.uid}/libros/${this.prestamoForm.get('libro').value}`, { prestado: true }).then(() => {
      this.prestamoSvc.anadirPrestamo(`usuarios/${this.authSvc.currentUser.uid}/prestamos`, this.prestamoForm.value).then(() => {

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
          title: 'Préstamo registrado!',
        });

        this.router.navigate(['/ver-prestamos-pendientes']);

      }).catch( err => {
        console.log(err);
      });
    }).catch(() => {
      loading.dismiss();
    });

  }

}

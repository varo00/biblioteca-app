import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LoadingController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  signUpForm: FormGroup
  verContrasena = false;

  constructor(
    private authService: AuthService,
    private userService: UsuarioService,
    private router: Router,
    private fb: FormBuilder,
    private menuCtrl: MenuController,
    private loadingCtrl : LoadingController,
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      imagen: [''],
    });

    this.menuCtrl.enable(false, 'first');
  }

  async onSubmit() {
    const loading = await this.loadingCtrl.create({
      spinner: 'circular'
    });
    await loading.present();

    this.authService.registro(this.signUpForm.get('email').value, this.signUpForm.get('password').value).then(async res => {

      
      if(this.signUpForm.get('imagen').value){
        let dataUrl = this.signUpForm.value['imagen'];
        let imagenPath = `${this.authService.currentUser.uid}/perfil`;
        let imagenUrl = await this.userService.subirFotoPerfil(imagenPath, dataUrl);
        this.signUpForm.controls['imagen'].setValue(imagenUrl);
      }

      let userReg = {
        nombre: this.signUpForm.get('nombre').value,
        apellidos: this.signUpForm.get('apellidos').value,
        email: this.signUpForm.get('email').value,
        imagen: this.signUpForm.get('imagen').value
      }

      loading.dismiss();
      this.userService.crearUsuario(userReg, res.user.uid).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          heightAuto: false,
        }).then(() => {
          this.router.navigate(['/home']);
        });
      });

    }).catch(() => {
      loading.dismiss();
      Swal.fire({
        icon: 'error',
        title: 'El email ya existe, prueba otro',
        heightAuto: false,
      })
    });

  }

  verPwd() {
    this.verContrasena = !this.verContrasena;
  }

  async takeImage() {
    const dataUrl = (await this.userService.tomarFotoPerfil()).dataUrl;
    this.signUpForm.controls['imagen'].setValue(dataUrl);
  }
}

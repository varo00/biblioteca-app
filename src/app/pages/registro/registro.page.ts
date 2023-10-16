import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { error } from 'console';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  signUpForm: FormGroup

  constructor(
    private authService: AuthService,
    private userService: UsuarioService,
    private router: Router,
    private fb: FormBuilder,
    private menuCtrl : MenuController,
  ) { }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      nombre: ['', [Validators.required]],
      apellidos: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.menuCtrl.enable(false, 'first');
  }

  async onSubmit() {
    
    this.authService.registro(this.signUpForm.get('email').value, this.signUpForm.get('password').value).then(() => {
      let userReg = {
        nombre : this.signUpForm.get('nombre').value,
        apellidos : this.signUpForm.get('apellidos').value,
        email : this.signUpForm.get('email').value,
      }
      this.userService.crearUsuario(userReg).then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          heightAuto: false,
        }).then(() => {
          this.router.navigate(['/']);
        })
      });
    }).catch(() => {
      Swal.fire({
        icon: 'error',
        title: 'El email ya existe, prueba otro',
        heightAuto: false,
      })
    });

  }

  verPwd(event) {
    const pwdHTML = document.getElementById('pwd');

    if (pwdHTML.getAttribute('type') === 'password') {
      pwdHTML.setAttribute('type', 'text');
      event.target.name = 'eye-off';
    } else {
      pwdHTML.setAttribute('type', 'password');
      event.target.name = 'eye';
    }
  }

}

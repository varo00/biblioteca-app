import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;
  verContrasena = false;

  constructor(
    private auhService: AuthService,
    private router: Router,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ionViewWillEnter() {
    this.loginForm.get('email').setValue(null);
    this.loginForm.get('password').setValue(null);

    this.loginForm.markAsUntouched();
    this.loginForm.markAsPristine();
  }

  async login() {
    this.auhService.login(this.loginForm.value).then(res => {
      
      Swal.fire({
        icon: 'success',
        title: 'Login Correcto',
        heightAuto: false,
        allowOutsideClick: false,
      }).then(() => {
        this.router.navigate(['/home']);
      });

    }).catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Email o contraseña incorrectos!!!',
        heightAuto: false,
        allowOutsideClick: false,
      });
    });
  }

  verPwd() {
    this.verContrasena = !this.verContrasena;
  }
}
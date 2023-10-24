import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-recuperar-pwd',
  templateUrl: './recuperar-pwd.page.html',
  styleUrls: ['./recuperar-pwd.page.scss'],
})
export class RecuperarPwdPage implements OnInit {
  form : FormGroup

  constructor(
    private authService : AuthService,
    private fb : FormBuilder,
    private router : Router,
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }

  submit(){
    this.authService.restablecerContrasena(this.form.get('email').value).then(res => {
      const exitoToast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
      });

      exitoToast.fire({
        icon: 'success',
        title: 'Correo enviado con éxito',
      });

      if(this.authService.currentUser === null){
        this.router.navigate(['/']);
      }else{
        this.authService.logout().then(() => {
          this.router.navigate(['/']);
        })
      }

      this.form.reset();
    }).catch(() => {
      const errorToast = Swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 2500,
        timerProgressBar: true,
      });

      errorToast.fire({
        icon: 'error',
        title: 'Correo no registrado'
      });
    })
  }

}

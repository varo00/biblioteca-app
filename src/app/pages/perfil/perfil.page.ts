import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario : Usuario;

  constructor(
    private usuarioSvc : UsuarioService,
    private authSvc : AuthService,
    private router : Router,
  ) {
    this.usuarioSvc.getUsuarioById(this.authSvc.currentUser.uid).subscribe( res => {
      this.usuario = res;
    });
  }

  ngOnInit() {
  }

  habilitarEditar(){
    const inputHTML = document.getElementsByTagName('ion-input');

    for (let i = 0; i < inputHTML.length; i++) {
      const el = inputHTML[i];
      el.removeAttribute('disabled');
    }
  }

  actualizarUsuario(){

  }

  cambiarPwd(){
    const toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: true,
      timer: 2000,
      timerProgressBar: true,
    });

    this.authSvc.restablecerContrasena(this.authSvc.currentUser.email).then(() => {
      this.authSvc.logout().then( res => {
        this.router.navigate(['']);
        toast.fire({
          icon: 'success',
          title: '¡Correo enviado con éxito!',
        });
      });
    });
  }

}

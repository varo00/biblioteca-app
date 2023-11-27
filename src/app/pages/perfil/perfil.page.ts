import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
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
  usuario: Usuario;

  constructor(
    private usuarioSvc: UsuarioService,
    private authSvc: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
  ) {
    this.usuarioSvc.getUsuarioById(this.authSvc.currentUser.uid).subscribe(res => {
      this.usuario = res;
    });
  }

  ngOnInit() {
  }

  actualizarUsuario() {

  }

  async tomarAvatar() {
    let user = this.usuario;

    let path = `usuarios/${user.doc}`;

    const dataUrl = (await this.usuarioSvc.tomarFotoPerfil()).dataUrl;

    const loading = await this.loadingCtrl.create({
      spinner: 'circular',
      mode: 'ios'
    });

    await loading.present();

    let imagenPath = `${user.doc}/perfil`;
    user.imagen = await this.usuarioSvc.subirFotoPerfil(imagenPath, dataUrl);

    this.usuarioSvc.updateUsuario(path, { imagen: user.imagen }).then(async res => {
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
        title: 'Imagen actualizada exitosamente',
      });
    }).catch(() => {
      console.log('error al actualizar la foto de perfil del usuario');
    });
  }

  cambiarPwd() {

    const toast = Swal.mixin({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true
    });

    this.authSvc.restablecerContrasena(this.authSvc.currentUser.email).then(() => {
      this.authSvc.logout().then(() => {
        this.router.navigate(['']);
        toast.fire({
          icon: 'success',
          title: '¡Correo enviado con éxito!',
        });
      });
    });
  }

}

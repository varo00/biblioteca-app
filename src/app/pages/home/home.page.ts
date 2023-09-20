import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  async logout() {
    this.authService.logout().then(() => {
      Swal.fire({
        title: '¿Estás seguro?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        heightAuto: false,
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/']);
        }
      })
    }).catch(err => {
      console.log(err);
    });
  }

}

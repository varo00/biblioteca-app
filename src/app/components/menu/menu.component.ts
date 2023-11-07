import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { LibrosService } from 'src/app/services/libros.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {
  path = `usuarios/${this.authSvc.currentUser.uid}/libros`;

  usuario : Usuario;

  librosLeidos : Number;
  totalLibros : Number;

  constructor(
    private libroSvc : LibrosService,
    private authSvc : AuthService,
    private usuarioSvc : UsuarioService,
  ) {

    this.libroSvc.getLibros(this.path).subscribe( res => {
      this.librosLeidos = res.filter(lib => lib['leido']).length || 0;
      this.totalLibros = res.length || 0;
    });

    this.usuarioSvc.getUsuarioById(this.authSvc.currentUser.uid).subscribe( res => {
      this.usuario = res;
    });
  }

  ngOnInit() {}

}

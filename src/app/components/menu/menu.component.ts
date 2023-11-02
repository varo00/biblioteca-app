import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent  implements OnInit {

  librosLeidos : Number;
  totalLibros : Number;

  constructor(
    private libroSvc : LibrosService,
    private authSvc : AuthService,
  ) {
    let path = `usuarios/${this.authSvc.currentUser.uid}/libros`;

    this.libroSvc.getLibros(path).subscribe( res => {
      this.librosLeidos = res.filter(lib => lib['leido']).length || 0;
      this.totalLibros = res.length || 0;
    })
  }

  ngOnInit() {}

}

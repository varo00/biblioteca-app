import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  usuario : Usuario;

  constructor(
    private menuCtrl : MenuController,
  ) {
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.menuCtrl.enable(true, 'first');
  }

}

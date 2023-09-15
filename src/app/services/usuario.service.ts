import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private firestore : Firestore,
  ) { }

  crearUsuario(){

  }

  getAll(){

  }

  deleteById(id){

  }

  update(id){

  }
}

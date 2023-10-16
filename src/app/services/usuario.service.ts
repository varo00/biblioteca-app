import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private firestore : Firestore,
  ) { }

  crearUsuario(user: Usuario){
    const userRef = collection(this.firestore, 'usuarios');
    return addDoc(userRef, user);
  }

  getById(id){
    
  }

  getAll(){

  }

  deleteById(id){

  }

  update(user){

  }
}

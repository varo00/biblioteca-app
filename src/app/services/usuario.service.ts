import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, docData } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private firestore : Firestore
  ) { }

  crearUsuario(user: Usuario, uid){
    const userRef = collection(this.firestore, 'usuarios');
    return addDoc(userRef, user);

  }

  getUsusarios() : Observable<Usuario[]>{
    const usuariosRef = collection(this.firestore, 'usuarios');
    return collectionData(usuariosRef, {idField: 'doc'}) as Observable<Usuario[]>;
  }

  deleteById(id){

  }

  updateUsuario(user:Usuario){

  }
}

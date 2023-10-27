import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc, doc, docData, setDoc } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private firestore : Firestore
  ) { }

  getUsuarioById(id:string) : Observable<Usuario>{
    const usuDocRef = doc(this.firestore, `usuarios/${id}`);
    return docData(usuDocRef, {idField: 'doc'}) as Observable<Usuario>;
  }

  getUsusarios() : Observable<Usuario[]>{
    const usuariosRef = collection(this.firestore, 'usuarios');
    return collectionData(usuariosRef, {idField: 'doc'}) as Observable<Usuario[]>;
  }

  crearUsuario(user: Usuario, uid){
    return setDoc(doc(this.firestore, `usuarios/${uid}`), user);
  }

  deleteById(id){
    
  }

  updateUsuario(user:Usuario){

  }
}

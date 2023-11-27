import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, doc, docData, setDoc, deleteDoc, getFirestore, updateDoc } from '@angular/fire/firestore';
import { Usuario } from '../interfaces/usuario';
import { Observable } from 'rxjs';
import { getDownloadURL, getStorage, ref, uploadString } from '@angular/fire/storage';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
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

  deleteUsuario(path) {
    return deleteDoc(doc(getFirestore(), path));
  }
  
  updateUsuario(path, data){
    return updateDoc(doc(getFirestore(), path), data);
  }

  /*
    avatar del usuario
  */ 
  async subirFotoPerfil(path: string, data_url: any) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path));
    });
  }

  async tomarFotoPerfil() {
    return await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
  }

  async rutaFotoPerfil(url : string){
    return ref(getStorage(), url).fullPath;
  }
}

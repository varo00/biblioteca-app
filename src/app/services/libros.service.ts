import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getFirestore, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libro';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL, deleteObject } from 'firebase/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(
    private firestore: Firestore,
    private authSvc  : AuthService,
  ) { }

  getLibros(path:string): Observable<Libro[]> {
    const ref = collection(this.firestore, path);
    return collectionData(ref, {idField: 'doc'}) as Observable<Libro[]>;
  }

  getLibroById(id: string): Observable<Libro> {
    const libroDocRef = doc(this.firestore, `libros/${id}`);
    return docData(libroDocRef, { idField: 'doc' }) as Observable<Libro>;
  }

  anadirLibro(libro: Libro, path) {
    return addDoc(collection(this.firestore, path), libro);
  }

  deleteLibro(path) {
    return deleteDoc(doc(getFirestore(), path));
  }
  
  updateLibro(path, data){
    return updateDoc(doc(getFirestore(), path), data);
  }


  /*
    SUBIR IMAGEN DE LOS LIBROS
  */
  async uploadImage(path: string, data_url: any) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path));
    });
  }

  async takePicture() {
    return await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
  }

  async getFilePath(url : string){
    return ref(getStorage(), url).fullPath;
  }

  deleteFile(path){
    return deleteObject(ref(getStorage(), path));
  }

}

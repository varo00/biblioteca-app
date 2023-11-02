import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, updateDoc, query, getFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libro';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, uploadString, ref, getDownloadURL } from 'firebase/storage';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(
    private firestore: Firestore,
    private authSvc  : AuthService,
  ) { }

  getLibros(path:string, collectionQuery ?: any): Observable<Libro[]> {
    const ref = collection(this.firestore, path);
    return collectionData(query(ref, collectionQuery), {idField: 'doc'}) as Observable<Libro[]>;
  }

  getLibroById(id: string): Observable<Libro> {
    const libroDocRef = doc(this.firestore, `libros/${id}`);
    return docData(libroDocRef, { idField: 'doc' }) as Observable<Libro>;
  }

  anadirLibro(libro: Libro, path) {
    // const libroRef = collection(this.firestore, 'libros');
    // return addDoc(libroRef, libro);

    return addDoc(collection(this.firestore, path), libro);
  }

  deleteLibro(libro: Libro) {
    const libroDocRef = doc(this.firestore, `usuarios/${this.authSvc.currentUser.uid}/libros/${libro.doc}`);
    return deleteDoc(libroDocRef);
  }

  updateLibro(libro: Libro) {
    const libroDocRef = doc(this.firestore, `usuarios/${this.authSvc.currentUser.uid}/libros/${libro.doc}`);
    return updateDoc(libroDocRef, {
      titulo: libro.titulo,
      autor: libro.autor,
      comentario: libro.comentario,
      leido: libro.leido
    });
  }


  async uploadImage(path: string, data_url: any) {
    return uploadString(ref(getStorage(), path), data_url, 'data_url').then(() => {
      return getDownloadURL(ref(getStorage(), path))
    });
  }

  async takePicture() {
    return await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera,
    });
  }

}

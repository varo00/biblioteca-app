import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, deleteDoc, doc, docData, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Libro } from '../interfaces/libro';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  constructor(
    private firestore : Firestore,
  ) { }

  getLibros() : Observable<Libro[]>{
    const librosRef = collection(this.firestore, 'libros');
    return collectionData(librosRef, {idField: 'doc'}) as Observable<Libro[]>;
  }

  getLibroById(id: string) : Observable<Libro> {
    const libroDocRef = doc(this.firestore, `libros/${id}`);
    return docData(libroDocRef, {idField: 'doc'}) as Observable<Libro>;
  }

  deleteLibro(libro : Libro){
    const libroDocRef = doc(this.firestore, `libros/${libro.doc}`);
    return deleteDoc(libroDocRef);
  }

  updateLibro(libro : Libro){
    const libroDocRef = doc(this.firestore, `libros/${libro.doc}`);
    return updateDoc(libroDocRef, {
      titulo: libro.titulo, 
      autor:libro.autor, 
      comentario: libro.comentario, 
      leido: libro.leido
    });
  }


}

import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, docData } from '@angular/fire/firestore';
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

  deleteLibro(){

  }

  updateLibro(libro){

  }
}

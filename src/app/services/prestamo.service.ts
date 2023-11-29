import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Prestamo } from '../interfaces/prestamo';

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {

  constructor(
    private firestore : Firestore,
  ) { }

  getPrestamos(path:string): Observable<Prestamo[]> {
    const ref = collection(this.firestore, path);
    return collectionData(ref, {idField: 'doc'}) as Observable<Prestamo[]>;
  }

  anadirPrestamo(path, prestamo : Prestamo) {
    return addDoc(collection(this.firestore, path), prestamo);
  }

}

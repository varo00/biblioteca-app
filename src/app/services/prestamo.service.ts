import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getFirestore} from '@angular/fire/firestore';
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

  getHistorial(path:string): Observable<any[]>{
    const ref = collection(this.firestore, path);
    return collectionData(ref, {idField: 'doc'});
  }

  anadirPrestamo(path:string, prestamo : Prestamo) {
    return addDoc(collection(this.firestore, path), prestamo);
  }

  deletePrestamo(path:string) {
    return deleteDoc(doc(getFirestore(), path));
  }

  devolverPrestamo(path:string, data:any){
    return addDoc(collection(this.firestore, path), data);
  }

  deleteRegistroHistorial(path:string){
    return deleteDoc(doc(getFirestore(), path));
  }

}

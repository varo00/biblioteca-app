import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth : Auth
  ) { }

  async login({email, password}){
    return await signInWithEmailAndPassword(this.auth, email, password);
  }
  
  async registro(email, password){
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  logout(){
    return signOut(this.auth);
  }

  async restablecerContrasena(email:string){
    return await sendPasswordResetEmail(this.auth, email);
  }

  get currentUser(){
    return this.auth.currentUser;
  }

}

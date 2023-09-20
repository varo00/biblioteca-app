import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, deleteUser } from '@angular/fire/auth';

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

  get currentUser(){
    return this.auth.currentUser;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-anadir-libro',
  templateUrl: './anadir-libro.page.html',
  styleUrls: ['./anadir-libro.page.scss'],
})
export class AnadirLibroPage implements OnInit {
  addBookForm : FormGroup;

  constructor(
    private menuCtrl : MenuController,
    private fb : FormBuilder,
    private authService : AuthService,
  ) { }

  ngOnInit() {

    this.addBookForm = this.fb.group({
      titulo : ['', [Validators.required]],
      autor : ['', [Validators.required]],
      comentario: [''],
      leido : [false, [ Validators.required]],
      usuario : [this.authService.currentUser.uid],
    });

    this.menuCtrl.enable(false, 'first');
  }

  onSubmit(){
    console.log(this.addBookForm.value);
  }

}

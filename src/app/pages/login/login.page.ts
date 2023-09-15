import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { error } from 'console';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup;

  constructor(
    private auhService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    this.auhService.login(this.loginForm.value).then(res => {
      this.router.navigate(['home']);
    }).catch(error => {
      this.showAlert("Login incorrecto", "Por favor, inténtelo de nuevo");
    });

  }

  async showAlert(header, message) {
    const alert = await this.alertCtrl.create({
      header,
      message,
      buttons: ['OK'],
      mode: 'ios'
    });

    await alert.present();
  }

  verPwd(event) {
    const pwdHTML = document.getElementById('pwd');

    if (pwdHTML.getAttribute('type') === 'password') {
      pwdHTML.setAttribute('type', 'text');
      event.target.name = 'eye-off';
    } else {
      pwdHTML.setAttribute('type', 'password');
      event.target.name = 'eye';
    }

  }
}
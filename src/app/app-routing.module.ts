import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { redirectUnauthorizedTo, redirectLoggedInTo, canActivate } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'perfil',
    loadChildren: () => import('./pages/perfil/perfil.module').then( m => m.PerfilPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'libro-modal',
    loadChildren: () => import('./pages/libro-modal/libro-modal.module').then( m => m.LibroModalPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'anadir-libro',
    loadChildren: () => import('./pages/anadir-libro/anadir-libro.module').then( m => m.AnadirLibroPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

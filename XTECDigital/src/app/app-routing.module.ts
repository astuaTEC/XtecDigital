import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginProfesorComponent } from './Vistas/Profesor/login-profesor/login-profesor.component';
import { HomeProfesorComponent } from './Vistas/Profesor/home-profesor/home-profesor.component';
import { InicioComponent } from './inicio/inicio.component';
import { GrupoProfesorComponent } from './Vistas/Profesor/grupo-profesor/grupo-profesor.component';
import { DocumentosProfesorComponent } from './Vistas/Profesor/documentos-profesor/documentos-profesor.component';

const routes: Routes = [
  //RUTA INICIAL
  {
    path: '', redirectTo: 'InicioSesion/ProfesorLogin',
     pathMatch: 'full'
  },
  //INICIO DE LA PÁGINA
  {
    path: 'InicioSesion',
    component: InicioComponent,
    children: [
    {path: 'ProfesorLogin', component: LoginProfesorComponent}

   ]},
  //VISTA ADMINISTRADOR

  //VISTA ESTUDIANTE

  //VISTA PROFESOR
  {
    path: 'ProfesorHome',
    component: HomeProfesorComponent
  },
  {
    path: 'ProfesorGrupo',
    component: GrupoProfesorComponent,
    children: [
      {path: 'Documentos', component: DocumentosProfesorComponent}
     ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

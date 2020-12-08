import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginProfesorComponent } from './Vistas/Profesor/login-profesor/login-profesor.component';
import { HomeProfesorComponent } from './Vistas/Profesor/home-profesor/home-profesor.component';
import { InicioComponent } from './inicio/inicio.component';
import { GrupoProfesorComponent } from './Vistas/Profesor/grupo-profesor/grupo-profesor.component';
import { DocumentosProfesorComponent } from './Vistas/Profesor/documentos-profesor/documentos-profesor.component';
import { ArchivosProfesorComponent } from './Vistas/Profesor/archivos-profesor/archivos-profesor.component';
import { VistaArchivoProfesorComponent } from './Vistas/Profesor/vista-archivo-profesor/vista-archivo-profesor.component';
import { RubrosProfesorComponent } from './Vistas/Profesor/rubros-profesor/rubros-profesor.component';
import { EvaluacionesProfesorComponent } from './Vistas/Profesor/evaluaciones-profesor/evaluaciones-profesor.component';
import { AgregarEvaluacionProfesorComponent } from './Vistas/Profesor/agregar-evaluacion-profesor/agregar-evaluacion-profesor.component';
import { EntregablesProfesorComponent } from './Vistas/Profesor/entregables-profesor/entregables-profesor.component';
import { CrearNoticiaProfesorComponent } from './Vistas/Profesor/crear-noticia-profesor/crear-noticia-profesor.component';
import { NoticiasProfesorComponent } from './Vistas/Profesor/noticias-profesor/noticias-profesor.component';
import { VerEvaluacionesComponent } from './Vistas/Profesor/ver-evaluaciones/ver-evaluaciones.component';
import { SplashScreenComponent } from './Vistas/Profesor/splash-screen/splash-screen.component';

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
      {path: 'Documentos', component: DocumentosProfesorComponent},
      {path: 'Documentos/:nombreCarpeta', component: ArchivosProfesorComponent},
      {path: 'Documentos/Archivos/Vista', component: VistaArchivoProfesorComponent},
      {path: 'Rubros', component: RubrosProfesorComponent},
      {path: 'Evaluaciones', component: EvaluacionesProfesorComponent},
      {path: 'Evaluaciones/Ver', component: VerEvaluacionesComponent},
      {path: 'NuevaEvaluacion/:nombreRubro/:porcentajeRubro', component: AgregarEvaluacionProfesorComponent},
      {path: 'Entregables/:nombreEvaluacion/:porcentajeEvaluacion', component: EntregablesProfesorComponent},
      {path: 'NuevaNoticia', component: CrearNoticiaProfesorComponent},
      {path: 'Noticias', component: NoticiasProfesorComponent},
     ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



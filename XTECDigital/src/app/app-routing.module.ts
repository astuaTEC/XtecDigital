import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginProfesorComponent } from './Vistas/Profesor/login-profesor/login-profesor.component';
import { HomeProfesorComponent } from './Vistas/Profesor/home-profesor/home-profesor.component';
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

import { LogInComponent } from './Vistas/Administrador/log-in/log-in.component';
import { SemestresComponent } from './Vistas/Administrador/semestres/semestres.component';
import { AdministradorComponent } from './Vistas/Administrador/administrador.component';
import { CursosComponent } from './Vistas/Administrador/cursos/cursos.component';

const routes: Routes = [
  //RUTA INICIAL
  {
    path: '', redirectTo: 'ProfesorLogin',
     pathMatch: 'full'
  },
   {path: 'ProfesorLogin',
    component: LoginProfesorComponent
  },
  {
    path: 'ProfesorHome/:cedulaProfesor',
    component: HomeProfesorComponent
  },
  {
    path: 'ProfesorGrupo/:cedulaProfesor/:nombreGrupo',
    component: GrupoProfesorComponent,
    children: [
      {path: 'Documentos', component: DocumentosProfesorComponent},
      {path: 'Documentos/:nombreCarpeta', component: ArchivosProfesorComponent},
      {path: 'Documentos/:nombreCarpeta/:nombreArchivo', component: VistaArchivoProfesorComponent},
      {path: 'Rubros', component: RubrosProfesorComponent},
      {path: 'Evaluaciones', component: EvaluacionesProfesorComponent},
      {path: 'Evaluaciones/:nombreRubro/:porcentajeRubro', component: VerEvaluacionesComponent},
      {path: 'NuevaEvaluacion/:nombreRubro/:porcentajeRubro', component: AgregarEvaluacionProfesorComponent},
      {path: 'Entregables/:nombreEvaluacion/:nombreRubro', component: EntregablesProfesorComponent},
      {path: 'NuevaNoticia/:Opcion', component: CrearNoticiaProfesorComponent},
      {path: 'Noticias', component: NoticiasProfesorComponent},
     ]},
     {
    path: 'AdministradorLogin',
    component: LogInComponent},
    {
    path: 'Administrador',
    component: AdministradorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



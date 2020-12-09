import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatExpansionModule} from '@angular/material/expansion';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginProfesorComponent } from './Vistas/Profesor/login-profesor/login-profesor.component';
import { HomeProfesorComponent } from './Vistas/Profesor/home-profesor/home-profesor.component';
import { InicioComponent } from './inicio/inicio.component';
import { GrupoProfesorComponent } from './Vistas/Profesor/grupo-profesor/grupo-profesor.component';
import { DocumentosProfesorComponent } from './Vistas/Profesor/documentos-profesor/documentos-profesor.component';
import { FormsModule } from '@angular/forms';
import { ArchivosProfesorComponent } from './Vistas/Profesor/archivos-profesor/archivos-profesor.component';
import { VistaArchivoProfesorComponent } from './Vistas/Profesor/vista-archivo-profesor/vista-archivo-profesor.component';
import { RubrosProfesorComponent } from './Vistas/Profesor/rubros-profesor/rubros-profesor.component';
import { EvaluacionesProfesorComponent } from './Vistas/Profesor/evaluaciones-profesor/evaluaciones-profesor.component';

import { LogInComponent } from './Vistas/Administrador/log-in/log-in.component';
import { SemestresComponent } from './Vistas/Administrador/semestres/semestres.component';
import { AdministradorComponent } from './Vistas/Administrador/administrador.component';
import { CursosComponent } from './Vistas/Administrador/cursos/cursos.component';

import { AgregarEvaluacionProfesorComponent } from './Vistas/Profesor/agregar-evaluacion-profesor/agregar-evaluacion-profesor.component';
import { EntregablesProfesorComponent } from './Vistas/Profesor/entregables-profesor/entregables-profesor.component';
import { CrearNoticiaProfesorComponent } from './Vistas/Profesor/crear-noticia-profesor/crear-noticia-profesor.component';
import { NoticiasProfesorComponent } from './Vistas/Profesor/noticias-profesor/noticias-profesor.component';
import { VerEvaluacionesComponent } from './Vistas/Profesor/ver-evaluaciones/ver-evaluaciones.component';
import { SplashScreenComponent } from './Vistas/Profesor/splash-screen/splash-screen.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginProfesorComponent,
    HomeProfesorComponent,
    InicioComponent,
    GrupoProfesorComponent,
    DocumentosProfesorComponent,
    ArchivosProfesorComponent,
    VistaArchivoProfesorComponent,
    RubrosProfesorComponent,
    EvaluacionesProfesorComponent,
    LogInComponent,
    SemestresComponent,
    AdministradorComponent,
    CursosComponent
    AgregarEvaluacionProfesorComponent,
    EntregablesProfesorComponent,
    CrearNoticiaProfesorComponent,
    NoticiasProfesorComponent,
    VerEvaluacionesComponent,
    SplashScreenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

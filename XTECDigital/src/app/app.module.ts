import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginProfesorComponent } from './Vistas/Profesor/login-profesor/login-profesor.component';
import { HomeProfesorComponent } from './Vistas/Profesor/home-profesor/home-profesor.component';
import { InicioComponent } from './inicio/inicio.component';
import { GrupoProfesorComponent } from './Vistas/Profesor/grupo-profesor/grupo-profesor.component';
import { DocumentosProfesorComponent } from './Vistas/Profesor/documentos-profesor/documentos-profesor.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginProfesorComponent,
    HomeProfesorComponent,
    InicioComponent,
    GrupoProfesorComponent,
    DocumentosProfesorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

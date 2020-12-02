import { Injectable } from '@angular/core';
import { Archivo } from '../ModelosProfesor/archivo';

@Injectable({
  providedIn: 'root'
})
export class ArchivosProfesorService {

  //Lista de todos los archivos cargados en una carpeta
  listaArchivos: Archivo[] = [];

  //archivo a desplegar
  archivo: File;

  setListaArchivos(listaArchivos){
    this.listaArchivos = listaArchivos;
  }

  getListaArchivos(){
    return this.listaArchivos;
  }
  constructor() { }
}

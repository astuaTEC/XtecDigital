import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoGrupoService {

  //nombre del grupo
  nombreGrupo: string = '';

  //Código del curso
  codigoCurso: string = '';

  //número del grupo
  numeroGrupo: number = 0;

  //año
  anio: string = '';

  //Periodo
  periodo: string = '';

  //Cedula del profesor
  numeroCedula: string = '';

  constructor() { }
}

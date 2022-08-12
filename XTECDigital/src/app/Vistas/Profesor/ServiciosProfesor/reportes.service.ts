import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  constructor(private http: HttpClient) { }

  //Solicita la lista de rubros con sus porcentaje
  getNotasEstudiantes(codigoCurso: string,  numeroGrupo: number, anio: string, periodo: string){
    return this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/profesor/curso/getNotas?', {
      params: {
        curso: '"' +codigoCurso + '"',
        grupo: numeroGrupo.toString(),
        anio: anio,
        periodo: periodo
      }});
  }
}

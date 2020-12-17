import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesService {

  constructor(private http: HttpClient) { }


  //Solicita las evaluaciones relacionadas a un rubro
  getRubros(codigoCurso: string, nombreRubro: string, numeroGrupo: number, anio: string, periodo: string){
    return this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/grupo/rubros?', {
      params: {
        curso: codigoCurso,
        grupo: numeroGrupo.toString(),
        anio: anio,
        periodo: periodo
      }});
  }
}

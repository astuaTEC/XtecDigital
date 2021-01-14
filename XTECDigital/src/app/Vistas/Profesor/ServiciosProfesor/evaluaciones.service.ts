import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionesService {


  constructor(private http: HttpClient) { }


  //Solicita la lista de rubros con sus porcentaje
  getRubros(codigoCurso: string, nombreRubro: string, numeroGrupo: number, anio: string, periodo: string){
    return this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/grupo/rubros?', {
      params: {
        curso: codigoCurso,
        grupo: numeroGrupo.toString(),
        anio: anio,
        periodo: periodo
      }});
  }


   //Solicita las evaluaciones relacionadas a un rubro
   getEvaluaciones(codigoCurso: string, nombreRubro: string, numeroGrupo: number, anio: string, periodo: string){
    return this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/grupo/rubro/evaluaciones?', {
      params: {
        curso: codigoCurso,
        rubro: nombreRubro,
        grupo: numeroGrupo.toString(),
        anio: anio,
        periodo: periodo
      }});
  }

  
  //Crear una nueva evaluacion individual
  crearNuevaEvaluacion(cuerpo:any){
    return this.http.post<string>('https://xtecdigitalsql.azurewebsites.net/api/grupo/evaluacion/new', cuerpo);
  }

  //Crear una nueva evaluacion Grupal
  crearNuevaEvaluacionGrupal(cuerpo:any){
    return this.http.post<string>('https://xtecdigitalsql.azurewebsites.net/api/grupo/evaluacion/subgrupos', cuerpo);
  }

  
  //Elimina una evaluacion en específico
  eliminarEvaluacion(codigoCurso: string, nombreRubro: string, nombreEvaluacion: string,  numeroGrupo: number, anio: string, periodo: string){
    return this.http.delete<string>('https://xtecdigitalsql.azurewebsites.net/api/grupo/evaluacion/delete?', {
      params: {
        curso: codigoCurso,
        rubro:nombreRubro,
        nombre: nombreEvaluacion,
        grupo: numeroGrupo.toString(),
        anio: anio,
        periodo: periodo,
      }});
  }

  //Solicita las evaluaciones relacionadas a un rubro
  getEntregables(codigoCurso: string, nombreRubro: string, nombreEvaluacion: string, numeroGrupo: number, anio: string, periodo: string){
    return this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/grupo/rubro/evaluacion/entregables?', {
      params: {
        curso: codigoCurso,
        rubro: nombreRubro,
        nombre: nombreEvaluacion,
        grupo: numeroGrupo.toString(),
        anio: anio,
        periodo: periodo
      }});
  }

  //Solicita el entregable correspondiente a una evaluación
  getArchivoEntregable(codigoCurso: string, nombreRubro: string, nombreEvaluacion: string, numeroGrupo: number, anio: string, periodo: string, carnet: string, id: number){
    return this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/grupo/rubro/evaluacion/entregable/archivo?', {
      params: {
        curso: codigoCurso,
        rubro: nombreRubro,
        nombre: nombreEvaluacion,
        grupo: numeroGrupo.toString(),
        anio: anio,
        periodo: periodo,
        carnet: carnet,
        id: id.toString()
      }});
  }

  calificarEntregable(cuerpo:any){
    return this.http.post<string>('https://xtecdigitalsql.azurewebsites.net/api/grupo/evaluacion/entregable/calificar', cuerpo);
  }

  //Publica las notas de los entregables calificados
  publicarNotas(codigoCurso: string, nombreRubro: string, nombreEvaluacion: string, numeroGrupo: number, anio: string, periodo: string, nombreProfesor: string){
    return this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/grupo/evaluacion/publicarNotas?', {
      params: {
        curso: codigoCurso,
        rubro: nombreRubro,
        nombre: nombreEvaluacion,
        grupo: numeroGrupo.toString(),
        anio: anio,
        periodo: periodo,
        profesor: nombreProfesor
      }});
  }
}

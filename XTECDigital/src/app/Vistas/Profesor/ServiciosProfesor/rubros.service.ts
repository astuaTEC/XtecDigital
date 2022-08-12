import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RubrosService {

  constructor(private http: HttpClient) { }

  
//Solicita los rubros relacionadas a un grupo
getRubros(codigoCurso: string, numeroGrupo: number, anio: string, periodo: string){
  return this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/grupo/rubros?', {
    params: {
      curso: codigoCurso,
      grupo: numeroGrupo.toString(),
      anio: anio,
      periodo: periodo
    }});
}

//Crear una nueva carpeta
crearNuevoRubro(nombre: string, numeroGrupo: number, codigoCurso: string, periodo: string, anio: string, porcentaje: number){
  //se modela el objeto JSON que se va a enviar
  let cuerpo = {
    nombre: nombre,
    numeroGrupo: numeroGrupo,
    codigoCurso: codigoCurso,
    periodo: periodo,
    anio: anio,
    porcentaje: porcentaje
  };
  return this.http.post<string>('https://xtecdigitalsql.azurewebsites.net/api/grupo/rubro/new', cuerpo);
}

//Crear una nueva carpeta
editarRubros(listaRubros: any[]){
  return this.http.put<string>('https://xtecdigitalsql.azurewebsites.net/api/grupo/rubro/edit', listaRubros);
}

//Solicita las carpetas relacionadas a un grupo
eliminarRubro(codigoCurso: string, numeroGrupo: number, anio: string, periodo: string, nombreRubro: string){
return this.http.delete<string>('https://xtecdigitalsql.azurewebsites.net/api/grupo/rubro/delete?', {
  params: {
    curso: codigoCurso,
    grupo: numeroGrupo.toString(),
    anio: anio,
    periodo: periodo,
    nombre: nombreRubro
  }});
}

}

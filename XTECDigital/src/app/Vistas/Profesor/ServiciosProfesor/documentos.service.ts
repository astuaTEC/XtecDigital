import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(private http: HttpClient) { }

    //Solicita las carpetas relacionadas a un grupo
    getCarpetas(codigoCurso: string, numeroGrupo: number, anio: string, periodo: string){
      return this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpetas?', {
        params: {
          curso: codigoCurso,
          grupo: numeroGrupo.toString(),
          anio: anio,
          periodo: periodo
        }});
    }

    //Crear una nueva carpeta
    crearNuevaCarpeta(nombre: string, numeroGrupo: number, codigoCurso: string, periodo: string, anio: string, creador: string){
      //se modela el objeto JSON que se va a enviar
      let cuerpo = {
        nombre: nombre,
        numeroGrupo: numeroGrupo,
        codigoCurso: codigoCurso,
        periodo: periodo,
        anio: anio,
        creador: creador
      };
      return this.http.post<string>('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpeta/new', cuerpo);
    }

     //Solicita eliminar una carpeta relacionada a un grupo
      eliminarCarpeta(codigoCurso: string, numeroGrupo: number, anio: string, periodo: string, nombreCarpeta: string){
        return this.http.delete<string>('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpeta/delete?', {
          params: {
            curso: codigoCurso,
            grupo: numeroGrupo.toString(),
            anio: anio,
            periodo: periodo,
            nombre: nombreCarpeta
          }});
      }
    
      //Solicita el nombre de los archivos de una carpeta
      getArchivos(codigoCurso: string, numeroGrupo: number, anio: string, periodo: string, nombreCarpeta: string){
        return this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpeta/archivos?', {
          params: {
            curso: codigoCurso,
            carpeta: nombreCarpeta,
            grupo: numeroGrupo.toString(),
            anio: anio,
            periodo: periodo
          }});
      }

    //Crear una nueva carpeta
    crearNuevoArchivo(nombre: string, nombreCarpeta: string, numeroGrupo: number, codigoCurso: string, periodo: string, anio: string, archivo: string, tamanio: string, fecha: string){
      //se modela el objeto JSON que se va a enviar
      let cuerpo = {
        nombre: nombre,
        nombreCarpeta: nombreCarpeta,
        numeroGrupo: numeroGrupo,
        codigoCurso: codigoCurso,
        periodo: periodo,
        anio: anio,
        archivo: archivo,
        tamanio: tamanio,
        fecha: fecha
      };
      return this.http.post<string>('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpeta/newArchivo', cuerpo);
    }

    //Solicita el documento pdf en base 64
    getArchivo(codigoCurso: string, carpeta: string, nombreArchivo:string, numeroGrupo: string, anio: string, periodo: string){
      return this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/grupo/carpeta/archivo/data?', {
        params: {
          curso: codigoCurso,
          carpeta: carpeta,
          nombre: nombreArchivo,
          grupo: numeroGrupo,
          anio: anio,
          periodo: periodo
        }});
    }
    

}

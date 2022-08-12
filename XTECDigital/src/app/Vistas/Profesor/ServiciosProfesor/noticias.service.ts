import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private http: HttpClient) { }

  //Solicita las noticias relacionadas a un grupo
  getNoticias(codigoCurso: string, numeroGrupo: number, anio: string, periodo: string){
    return this.http.get<any[]>('https://xtecdigitalsql.azurewebsites.net/api/grupo/noticias?', {
      params: {
        curso: codigoCurso,
        grupo: numeroGrupo.toString(),
        anio: anio,
        periodo: periodo
      }});
  }

  //Crear una nueva noticia
  crearNuevaNoticia(numeroGrupo: number, codigoCurso: string, periodo: string, anio: string, fechaPublicacion: string, titulo: string, mensaje: string, autor: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      numeroGrupo: numeroGrupo,
      codigoCurso: codigoCurso,
      periodo: periodo,
      anio: anio,
      fechaPublicacion: fechaPublicacion,
      titulo: titulo,
      mensaje: mensaje,
      autor: autor
    };
    return this.http.post<string>('https://xtecdigitalsql.azurewebsites.net/api/grupo/noticia/new', cuerpo);
  }

  //Elimina una noticia en específico
  eliminarNoticia(codigoCurso: string, numeroGrupo: number, anio: string, periodo: string, id: number){
    return this.http.delete<string>('https://xtecdigitalsql.azurewebsites.net/api/grupo/noticia/delete?', {
      params: {
        curso: codigoCurso,
        grupo: numeroGrupo.toString(),
        anio: anio,
        periodo: periodo,
        id: id.toString()
      }});
  }

  //Crear una nueva noticia
  editarNoticia(id:number, numeroGrupo: number, codigoCurso: string, periodo: string, anio: string, fechaPublicacion: string, titulo: string, mensaje: string, autor: string){
    //se modela el objeto JSON que se va a enviar
    let cuerpo = {
      id: id,
      numeroGrupo: numeroGrupo,
      codigoCurso: codigoCurso,
      periodo: periodo,
      anio: anio,
      fechaPublicacion: fechaPublicacion,
      titulo: titulo,
      mensaje: mensaje,
      autor: autor
    };
    return this.http.put<string>('https://xtecdigitalsql.azurewebsites.net/api/grupo/noticia/edit', cuerpo);
  }
    

}

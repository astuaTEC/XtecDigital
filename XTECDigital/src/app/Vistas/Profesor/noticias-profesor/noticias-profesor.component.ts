import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { NoticiasService } from 'src/app/Vistas/Profesor/ServiciosProfesor/noticias.service';
import { InfoGrupoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/info-grupo.service';
import { Noticia } from '../ModelosProfesor/noticia';
import { NgIfContext } from '@angular/common';


@Component({
  selector: 'app-noticias-profesor',
  templateUrl: './noticias-profesor.component.html',
  styleUrls: ['./noticias-profesor.component.css'],

  
})
export class NoticiasProfesorComponent implements OnInit {

  //La lista de noticias que están relacionadas con el grupo
  listaNoticias: Noticia[] = [];


  constructor(private route: ActivatedRoute, private router: Router, private infoGrupo: InfoGrupoService, private noticiasService: NoticiasService) { 

  }

  ngOnInit(): void {
    //Cuando carga el componente se piden las noticias relacionadas con el grupo
    this.actualizarNoticias();
  }

  nuevaNoticia(){
    this.router.navigate(['/ProfesorGrupo',this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'NuevaNoticia', 'Crear']);
  }

  editarNoticia(noticia: Noticia){
    this.router.navigate(['/ProfesorGrupo',this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'NuevaNoticia', noticia.id]);
  }

  actualizarNoticias(){
    //Se hace la petición por medio del servicio de noticias
    this.noticiasService.getNoticias(
      this.infoGrupo.codigoCurso,
      this.infoGrupo.numeroGrupo,
      this.infoGrupo.anio,
      this.infoGrupo.periodo
    ).subscribe(data => {
      //Se limpia la lista de noticias
      this.listaNoticias = [];
     for(let i = 0; i < data.length; i++){
       this.listaNoticias.push(
         new Noticia(
           data[i].id,
           data[i].titulo,
           data[i].mensaje,
           data[i].fechaPublicacion,
           data[i].autor
         )
       );
     }
    });
  }

  eliminarNoticia(noticia: Noticia){
    //Se solicita eliminar la noticia mediante el servicio de noticias
    this.noticiasService.eliminarNoticia(
      this.infoGrupo.codigoCurso,
      this.infoGrupo.numeroGrupo,
      this.infoGrupo.anio,
      this.infoGrupo.periodo,
      noticia.id
    ).subscribe(
      data => {
        console.log(data);
    
      },
      error => {
        console.log(error);
        //Una vez eliminado el rubro, se resetean todos los porcentajes
        this.actualizarNoticias(); 
      });

  }

}

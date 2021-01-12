import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { NoticiasService } from 'src/app/Vistas/Profesor/ServiciosProfesor/noticias.service';
import { Noticia } from '../ModelosProfesor/noticia';
import { Estado } from 'src/app/modelos/estado';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-noticias-profesor',
  templateUrl: './noticias-profesor.component.html',
  styleUrls: ['./noticias-profesor.component.css'],

  
})
export class NoticiasProfesorComponent implements OnInit {

  //La lista de noticias que están relacionadas con el grupo
  listaNoticias: Noticia[] = [];

  //Estado actual de la aplicación
  estadoLocal: Estado;
  
  constructor(private route: ActivatedRoute, private router: Router, private noticiasService: NoticiasService) { 

  }

  ngOnInit(): void {
    //Cargar la información del estado actual desde el local storage
    this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));

    //Cuando carga el componente se piden las noticias relacionadas con el grupo
    this.actualizarNoticias();
  }

  nuevaNoticia(){
    this.router.navigate(['/ProfesorGrupo',this.estadoLocal.numeroCedula, this.estadoLocal.nombreGrupo, 'NuevaNoticia', 'Crear']);
  }

  editarNoticia(noticia: Noticia){
    this.router.navigate(['/ProfesorGrupo',this.estadoLocal.numeroCedula, this.estadoLocal.nombreGrupo, 'NuevaNoticia', noticia.id]);
  }

  actualizarNoticias(){
    //Se hace la petición por medio del servicio de noticias
    this.noticiasService.getNoticias(
      this.estadoLocal.codigoCurso,
      this.estadoLocal.numeroGrupo,
      this.estadoLocal.anio,
      this.estadoLocal.periodo
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
    Swal.fire({
      title: 'Eliminar Noticia',
      text: "¿ Seguro que deseas eliminar la noticia referente a " + noticia.titulo + " ?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        //Se solicita eliminar la noticia mediante el servicio de noticias
        this.noticiasService.eliminarNoticia(
          this.estadoLocal.codigoCurso,
          this.estadoLocal.numeroGrupo,
          this.estadoLocal.anio,
          this.estadoLocal.periodo,
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
    })

  }

}

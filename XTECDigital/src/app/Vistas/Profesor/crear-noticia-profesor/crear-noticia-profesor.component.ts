import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { NoticiasService } from 'src/app/Vistas/Profesor/ServiciosProfesor/noticias.service';
import { InfoGrupoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/info-grupo.service';
import { Noticia } from '../ModelosProfesor/noticia';
 

@Component({
  selector: 'app-crear-noticia-profesor',
  templateUrl: './crear-noticia-profesor.component.html',
  styleUrls: ['./crear-noticia-profesor.component.css']
})
export class CrearNoticiaProfesorComponent implements OnInit {

   //El comando a ejecutar
   comando: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private infoGrupo: InfoGrupoService, private noticiasService: NoticiasService) { }

  //Modelo que almacena los datos ingresados por el usuario
  noticia: Noticia = new Noticia(0, '', '', '', '');

  ngOnInit(): void {
    //primero se guarda el número de cédula del profesor
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.comando = params.get('Opcion');
      });
      if(this.comando != 'Crear'){
        //Se deben pedir los datos para mostrarlos
        this.getNoticiaEditar();

      }
  }

  cerrar(){
    this.router.navigate(['/ProfesorGrupo',this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'Noticias']);
  }

  nuevaNoticia(){
    //Construyendo la fecha en que se está subiendo
    var date = new Date();
    var fecha = date.getFullYear() +'-'+(date.getMonth()+1) + '-'+date.getDate();
    var hora = date.getHours() +':' + date.getMinutes() + ':' + date.getSeconds();
    this.noticia.fechaPublicacion = fecha + ' ' + hora;

    //Transfiriendo el nombre del profesor que está agregando la noticia
    this.noticia.autor = this.infoGrupo.nombreProfesor;
    
    //Se realiza la petición mediante el servicio de Noticias
    this.noticiasService.crearNuevaNoticia(
      this.infoGrupo.numeroGrupo,
      this.infoGrupo.codigoCurso,
      this.infoGrupo.periodo,
      this.infoGrupo.anio,
      this.noticia.fechaPublicacion,
      this.noticia.titulo,
      this.noticia.mensaje,
      this.noticia.autor
    ).subscribe(
      data => {
        console.log(data);
    
      },
      error => {
        console.log(error);
        this.cerrar();
        if(error.status === 400){
       
        }
      });
  }

  editarNoticia(){
    //Construyendo la fecha en que se está subiendo
    var date = new Date();
    var fecha = date.getFullYear() +'-'+(date.getMonth()+1) + '-'+date.getDate();
    var hora = date.getHours() +':' + date.getMinutes() + ':' + date.getSeconds();
    this.noticia.fechaPublicacion = fecha + ' ' + hora;

    //Transfiriendo el nombre del profesor que está agregando la noticia
    this.noticia.autor = this.infoGrupo.nombreProfesor;
    
    //Se realiza la petición mediante el servicio de Noticias
    this.noticiasService.editarNoticia(
      this.noticia.id,
      this.infoGrupo.numeroGrupo,
      this.infoGrupo.codigoCurso,
      this.infoGrupo.periodo,
      this.infoGrupo.anio,
      this.noticia.fechaPublicacion,
      this.noticia.titulo,
      this.noticia.mensaje,
      this.noticia.autor
    ).subscribe(
      data => {
        console.log(data);
    
      },
      error => {
        console.log(error);
        this.cerrar();
        if(error.status === 400){
       
        }
      });
  }

  getNoticiaEditar(){
    //Se piden los datos de la noticia que se desea editar
    this.noticiasService.getNoticias(
      this.infoGrupo.codigoCurso,
      this.infoGrupo.numeroGrupo,
      this.infoGrupo.anio,
      this.infoGrupo.periodo
    ).subscribe(data => {
     for(let i = 0; i < data.length; i++){
       //Se localiza la noticia
       if(data[i].id.toString() == this.comando){
        //Se rellenan los valores
        this.noticia = new Noticia(
          data[i].id,
          data[i].titulo,
          data[i].mensaje,
          data[i].fechaPublicacion,
          data[i].autor
        );
       }
     }
    });

  }

  guardar(){
    //Se debe valiadar si el usuario está guardando o editando noticias
    if(this.comando == 'Crear'){
      this.nuevaNoticia();
    }
    else{
      this.editarNoticia();
    }
  }

}

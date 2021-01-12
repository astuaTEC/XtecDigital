import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { NoticiasService } from 'src/app/Vistas/Profesor/ServiciosProfesor/noticias.service';
import { Noticia } from '../ModelosProfesor/noticia';
import { Estado } from 'src/app/modelos/estado';
 

@Component({
  selector: 'app-crear-noticia-profesor',
  templateUrl: './crear-noticia-profesor.component.html',
  styleUrls: ['./crear-noticia-profesor.component.css']
})
export class CrearNoticiaProfesorComponent implements OnInit {

   //El comando a ejecutar
   comando: string = '';

   //Estado actual de la aplicación
   estadoLocal: Estado;

  constructor(private route: ActivatedRoute, private router: Router, private noticiasService: NoticiasService) { }

  //Modelo que almacena los datos ingresados por el usuario
  noticia: Noticia = new Noticia(0, '', '', '', '');

  ngOnInit(): void {
    //Se carga la información del estado actual
    this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));

    //Se guarda el número de cédula del profesor
    this.route.paramMap.subscribe((params: ParamMap) => {
        this.comando = params.get('Opcion');
      });
      if(this.comando != 'Crear'){
        //Se deben pedir los datos para mostrarlos
        this.getNoticiaEditar();

      }
  }

  cerrar(){
    this.router.navigate(['/ProfesorGrupo',this.estadoLocal.numeroCedula, this.estadoLocal.nombreGrupo, 'Noticias']);
  }

  nuevaNoticia(){
    //Construyendo la fecha en que se está subiendo
    var date = new Date();
    var fecha = date.getFullYear() +'-'+(date.getMonth()+1) + '-'+date.getDate();
    var hora = date.getHours() +':' + date.getMinutes() + ':' + date.getSeconds();
    this.noticia.fechaPublicacion = fecha + ' ' + hora;

    //Transfiriendo el nombre del profesor que está agregando la noticia
    this.noticia.autor = this.estadoLocal.nombreProfesor;
    
    //Se realiza la petición mediante el servicio de Noticias
    this.noticiasService.crearNuevaNoticia(
      this.estadoLocal.numeroGrupo,
      this.estadoLocal.codigoCurso,
      this.estadoLocal.periodo,
      this.estadoLocal.anio,
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
    this.noticia.autor = this.estadoLocal.nombreProfesor;
    
    //Se realiza la petición mediante el servicio de Noticias
    this.noticiasService.editarNoticia(
      this.noticia.id,
      this.estadoLocal.numeroGrupo,
      this.estadoLocal.codigoCurso,
      this.estadoLocal.periodo,
      this.estadoLocal.anio,
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
      this.estadoLocal.codigoCurso,
      this.estadoLocal.numeroGrupo,
      this.estadoLocal.anio,
      this.estadoLocal.periodo
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

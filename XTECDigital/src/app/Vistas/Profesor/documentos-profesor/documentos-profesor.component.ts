import { Component, OnInit } from '@angular/core';
import { Carpeta } from '../ModelosProfesor/carpeta';
import { Router, ActivatedRoute} from '@angular/router';
import { InfoGrupoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/info-grupo.service';
import { DocumentosService } from 'src/app/Vistas/Profesor/ServiciosProfesor/documentos.service';

@Component({
  selector: 'app-documentos-profesor',
  templateUrl: './documentos-profesor.component.html',
  styleUrls: ['./documentos-profesor.component.css']
})
export class DocumentosProfesorComponent implements OnInit {

  //Variable que determina cuándo se debe desplegar el input de agregar nueva carpeta
  nuevaCarpetaActivado: boolean = false;

  //Nombre de la nueva carepeta -> Con ngModel
  nuevaCarpeta: string = '';

  //Lista de las carpetas que deben provenir del servidor
  listaCarpetas: Carpeta[] = [];

  constructor(private documentos: DocumentosService, private route: ActivatedRoute, private router: Router, private infoGrupo: InfoGrupoService) { }

  ngOnInit(): void {
   
    this.actualizarCarpetas();
  }

  activarNC(){
    if(this.nuevaCarpetaActivado === true){
      this.nuevaCarpetaActivado = false;
    }
    else{
      this.nuevaCarpetaActivado = true;
    }
  }

  eliminarCarpeta(carpeta: Carpeta){
    this.documentos.eliminarCarpeta(
      this.infoGrupo.codigoCurso,
      this.infoGrupo.numeroGrupo,
      this.infoGrupo.anio,
      this.infoGrupo.periodo,
      carpeta.nombre
    ).subscribe(
      data => {
        console.log(data);
    
      },
      error => {
        console.log(error);
        this.actualizarCarpetas()
      });

  }

  agregarNuevaCarpeta(){
    if(this.nuevaCarpeta != ''){
      this.documentos.crearNuevaCarpeta(
        this.nuevaCarpeta,
        this.infoGrupo.numeroGrupo,
        this.infoGrupo.codigoCurso,
        this.infoGrupo.periodo,
        this.infoGrupo.anio,
        this.infoGrupo.numeroCedula
      ) .subscribe(
        data => {
          console.log(data);
          this.nuevaCarpeta = ''; 
      
        },
        error => {
          console.log(error);
          this.actualizarCarpetas()
          if(error.status === 400){
            this.nuevaCarpeta = '';
          }
        }); 

      this.activarNC();
      this.nuevaCarpeta = '';
    }
  }

  actualizarCarpetas(){
    //Se solicitan las carpetas correspondientes a este grupo
    this.documentos.getCarpetas(
      this.infoGrupo.codigoCurso,
      this.infoGrupo.numeroGrupo,
      this.infoGrupo.anio,
      this.infoGrupo.periodo
    )
    .subscribe(data => {
      //limpiar la lista actual
      this.listaCarpetas = [];
      //se recorre la lista de carpetas y se almacenan en la lista local
      for(let i = 0 ; i < data.length; i++){
        //Se valida la protección de la carpeta
        let protegida: boolean = false;
        if(data[i].creador === 'System'){
          protegida = true;
        }
        let nuevaCarpeta = new Carpeta(data[i].nombre, protegida);
        //se agrega a la lista de carpetas
        this.listaCarpetas.push(nuevaCarpeta);
      }
    });

  }

  gotoArchivos(nombreCarpeta: string){
    this.router.navigate(['/ProfesorGrupo', this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'Documentos', nombreCarpeta]);
  }

}

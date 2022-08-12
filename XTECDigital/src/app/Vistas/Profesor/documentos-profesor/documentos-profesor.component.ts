import { Component, OnInit } from '@angular/core';
import { Carpeta } from '../ModelosProfesor/carpeta';
import { Router, ActivatedRoute} from '@angular/router';
import { DocumentosService } from 'src/app/Vistas/Profesor/ServiciosProfesor/documentos.service';
import { Estado } from 'src/app/modelos/estado';
import Swal from 'sweetalert2'


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

  //Estado actual de la aplicación
  estadoLocal: Estado;

  constructor(private documentos: DocumentosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //Se debe cargar la información que se encuentra en local storage
    this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
    console.log(this.estadoLocal);
   
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
    Swal.fire({
      title: 'Eliminar Carpeta',
      text: "¿ Seguro que deseas eliminar la carpeta " + carpeta.nombre + " ?",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.documentos.eliminarCarpeta(
          this.estadoLocal.codigoCurso,
          this.estadoLocal.numeroGrupo,
          this.estadoLocal.anio,
          this.estadoLocal.periodo,
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
    })


  }

  agregarNuevaCarpeta(){
    if(this.nuevaCarpeta != '' && !this.carpetaRepetida(this.nuevaCarpeta)){
      this.documentos.crearNuevaCarpeta(
        this.nuevaCarpeta,
        this.estadoLocal.numeroGrupo,
        this.estadoLocal.codigoCurso,
        this.estadoLocal.periodo,
        this.estadoLocal.anio,
        this.estadoLocal.numeroCedula
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
    else{
      Swal.fire({
        icon: 'error',
        title: 'Agregar carpeta',
        text: 'Ya existe una carpeta con el mismo nombre',
        showConfirmButton: false,
        timer: 2000
      })
      this.nuevaCarpeta = '';
      this.activarNC();
    }
  }

  carpetaRepetida(nuevaCarpeta: string): boolean{
    let repetida: boolean = false;
    //Se recorren las carpetas para validar si existe alguna con el mismo nombre
    for(let carpeta of this.listaCarpetas){
      if(nuevaCarpeta == carpeta.nombre){
        repetida = true;
        break;
      }
    }
    return repetida;
  }

  actualizarCarpetas(){
    //Se solicitan las carpetas correspondientes a este grupo
    this.documentos.getCarpetas(
      this.estadoLocal.codigoCurso,
      this.estadoLocal.numeroGrupo,
      this.estadoLocal.anio,
      this.estadoLocal.periodo
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
    this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Documentos', nombreCarpeta]);
  }

}

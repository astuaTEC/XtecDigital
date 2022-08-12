import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Archivo } from 'src/app/Vistas/Profesor/ModelosProfesor/archivo';
import { DocumentosService } from 'src/app/Vistas/Profesor/ServiciosProfesor/documentos.service';
import { Estado } from 'src/app/modelos/estado';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-archivos-profesor',
  templateUrl: './archivos-profesor.component.html',
  styleUrls: ['./archivos-profesor.component.css']
})
export class ArchivosProfesorComponent implements OnInit {

  //Nombre de la carpeta
  nombreCarpeta: string;

  //Archivo a seleccionar
  fileToUpload: File = null;

  //Mostrar el seleccionador de archivos
  seleccionarArchivo: boolean = false;

  //plantilla en base 64
  plantilla: any;

  //Lista de archivos que se muestran
  listaArchivos: Archivo[] = [];

  //Estado local de la aplicación
  estadoLocal: Estado;

  constructor(private documentos: DocumentosService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    //Primero se carga la información del estado local en la variable local
    this.estadoLocal = JSON.parse(localStorage.getItem('EstadoActual'));
    console.log(this.estadoLocal);
    this.route.paramMap.subscribe((params: ParamMap) => {
      let nombreCarpeta = params.get('nombreCarpeta');
      this.nombreCarpeta = nombreCarpeta;
  });
  //Se pide la información de los archivos que se encuentran en esta carpeta
  this.actualizarArchivos();

}

agregarNuevoArchivo(files: FileList) {
  //Se carga el archivo desde el elemento HTML
  this.fileToUpload = files.item(0);
  var reader = new FileReader();
  reader.readAsDataURL(this.fileToUpload);
  reader.onload = (completionEvent) => {
    console.log(completionEvent);
    this.documentos.archivoB64 = reader.result;
    //Construyendo la fecha en que se está subiendo
    var date = new Date();
    var fecha = date.getFullYear() +'-'+(date.getMonth()+1) + '-'+date.getDate();
    var hora = date.getHours() +':' + date.getMinutes() + ':' + date.getSeconds();
    var fechaHoraString = fecha + ' ' + hora;

    //Agregando el nuevo archivo mediante el servicio de documentos
    this.documentos.crearNuevoArchivo(
      this.fileToUpload.name,
      this.nombreCarpeta,
      this.estadoLocal.numeroGrupo,
      this.estadoLocal.codigoCurso,
      this.estadoLocal.periodo,
      this.estadoLocal.anio,
      Math.round(this.fileToUpload.size / 1024).toString() + ' KB',
      fechaHoraString
    ).subscribe(
      data => {
        console.log(data);
    
      },
      error => {
        console.log(error);
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado un nuevo archivo',
          showConfirmButton: false,
          timer: 2000
        })
        this.actualizarArchivos()
        //cerrar el apartado de nuevo archivo
        this.activarSeleccionarArchivo();
        if(error.status === 400){
       
        }
      }); 
   

  };
  reader.onerror = (error) => {
    console.log('Error: ', error);
  };
}

activarSeleccionarArchivo(){
  if(!this.seleccionarArchivo){
    this.seleccionarArchivo = true;
  }
  else{
    this.seleccionarArchivo = false;
  }
}

eliminarArchivo(archivo: Archivo){
  Swal.fire({
    title: 'Eliminar Archivo',
    text: "¿ Seguro que deseas eliminar el archivo " + archivo.nombre + " ?",
    icon: 'warning',
    showCancelButton: true,
    cancelButtonColor: '#3085d6',
    confirmButtonColor: '#d33',
    cancelButtonText: 'Cancelar',
    confirmButtonText: 'Confirmar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.documentos.eliminarArchivo(
        this.estadoLocal.codigoCurso,
        this.nombreCarpeta,
        archivo.nombre,
        this.estadoLocal.numeroGrupo,
        this.estadoLocal.anio,
        this.estadoLocal.periodo
      )
      .subscribe(
        data => {
          console.log(data);
      
        },
        error => {
          console.log(error);
          Swal.fire({
            icon: 'success',
            title: 'Se ha eliminado un archivo',
            showConfirmButton: false,
            timer: 2000
          })
          this.actualizarArchivos()
        });
    }
  })
}

actualizarArchivos(){
  //Solicitar la lista de archivos por medio del servicio
  this.documentos.getArchivos(
    this.estadoLocal.codigoCurso,
    this.estadoLocal.numeroGrupo,
    this.estadoLocal.anio,
    this.estadoLocal.periodo,
    this.nombreCarpeta
  ).subscribe( data => {
    //limpiar la lista de archivos
    this.listaArchivos = [];
    for(let i = 0; i < data.length; i++){
      this.listaArchivos.push(
        new Archivo(data[i].nombre, data[i].tamanio, data[i].fecha)
      );
    }
  });

}


gotoVisor(archivo: Archivo){
  this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Documentos', this.nombreCarpeta, archivo.nombre]);
}

gotoDocumentos(){
    this.router.navigate(['/ProfesorGrupo', this.estadoLocal.numeroCedula, this.estadoLocal.nombreProfesor, this.estadoLocal.nombreGrupo, 'Documentos']);
}

}




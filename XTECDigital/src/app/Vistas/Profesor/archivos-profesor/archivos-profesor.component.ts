import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Archivo } from 'src/app/Vistas/Profesor/ModelosProfesor/archivo';
import { InfoGrupoService } from 'src/app/Vistas/Profesor/ServiciosProfesor/info-grupo.service';
import { DocumentosService } from 'src/app/Vistas/Profesor/ServiciosProfesor/documentos.service';


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

  constructor(private documentos: DocumentosService, private infoGrupo: InfoGrupoService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
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

  //Construyendo la fecha en que se está subiendo
  var date = new Date();
  var fecha = date.getFullYear() +'-'+(date.getMonth()+1) + '-'+date.getDate();
  var hora = date.getHours() +':' + date.getMinutes() + ':' + date.getSeconds();
  var fechaHoraString = fecha + ' ' + hora;

  //Crear el documento en Base64
  var reader = new FileReader();
  reader.readAsDataURL(this.fileToUpload);
  reader.onload = () => {
    this.plantilla = reader.result;
  };
  reader.onerror = (error) => {
    console.log('Error: ', error);
  };

  //Agregando el nuevo archivo mediante el servicio de documentos
  this.documentos.crearNuevoArchivo(
    this.fileToUpload.name,
    this.nombreCarpeta,
    this.infoGrupo.numeroGrupo,
    this.infoGrupo.codigoCurso,
    this.infoGrupo.periodo,
    this.infoGrupo.anio,
    this.plantilla,
    Math.round(this.fileToUpload.size / 1024).toString() + ' KB',
    fechaHoraString
  ).subscribe(
    data => {
      console.log(data);
      
    },
    error => {
      console.log(error);
      this.actualizarArchivos();
      if(error.status === 400){
      }
    }); 

  //cerrar el apartado de nuevo archivo
  this.activarSeleccionarArchivo();
}

activarSeleccionarArchivo(){
  if(!this.seleccionarArchivo){
    this.seleccionarArchivo = true;
  }
  else{
    this.seleccionarArchivo = false;
  }
}


base64(file:File) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    this.plantilla = reader.result;
  };
  reader.onerror = (error) => {
    console.log('Error: ', error);
  };
}

eliminarArchivo(carpeta: Archivo){
  for(let i = 0; i < this.listaArchivos.length; i++){
    if(carpeta === this.listaArchivos[i]){
      this.listaArchivos.splice(i, 1);
    }
  }
}

actualizarArchivos(){
  //Solicitar la lista de archivos por medio del servicio
  this.documentos.getArchivos(
    this.infoGrupo.codigoCurso,
    this.infoGrupo.numeroGrupo,
    this.infoGrupo.anio,
    this.infoGrupo.periodo,
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
  this.router.navigate(['/ProfesorGrupo', this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'Documentos', this.nombreCarpeta, archivo.nombre]);
}

gotoDocumentos(){
    this.router.navigate(['/ProfesorGrupo', this.infoGrupo.numeroCedula, this.infoGrupo.nombreGrupo, 'Documentos']);
}

}




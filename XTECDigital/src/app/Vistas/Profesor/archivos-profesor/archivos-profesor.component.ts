import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { ArchivosProfesorService } from 'src/app/Vistas/Profesor/ServiciosProfesor/archivos-profesor.service';
import { Archivo } from 'src/app/Vistas/Profesor/ModelosProfesor/archivo';

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

  constructor(private route: ActivatedRoute, private router: Router, private archivosService: ArchivosProfesorService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let nombreCarpeta = params.get('nombreCarpeta');
      this.nombreCarpeta = nombreCarpeta;
    
  });

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
  this.base64(this.fileToUpload);
 
  //Agregandolo a la lista
  this.listaArchivos.push(
    new Archivo(this.fileToUpload.name, Math.round(this.fileToUpload.size / 1024) , fechaHoraString, this.plantilla)
  );

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
    this.archivosService.b64 = reader.result;
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


gotoVisor(base64){
  this.router.navigate(['/ProfesorGrupo/Documentos/Archivos/Vista']);
}

gotoDocumentos(){
  this.router.navigate(['/ProfesorGrupo/Documentos']);
}

}




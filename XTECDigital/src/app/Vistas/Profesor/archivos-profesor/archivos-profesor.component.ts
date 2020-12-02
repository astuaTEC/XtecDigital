import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { ArchivosProfesorService } from 'src/app/Vistas/Profesor/ServiciosProfesor/archivos-profesor.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private archivosService: ArchivosProfesorService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let nombreCarpeta = params.get('nombreCarpeta');
      this.nombreCarpeta = nombreCarpeta;
    
  });
}

handleFileInput(files: FileList) {
  this.fileToUpload = files.item(0);
  console.log('Nombre',this.fileToUpload.name);
  console.log('Tipo',this.fileToUpload.type);
  console.log('Tamaño',this.fileToUpload.size);
  this.archivosService.archivo = this.fileToUpload;
}

activarSeleccionarArchivo(){
  if(!this.seleccionarArchivo){
    this.seleccionarArchivo = true;
  }
  else{
    this.seleccionarArchivo = false;
  }
}

gotoVisor(){
  this.router.navigate(['/ProfesorGrupo/Documentos/Archivos/Vista']);
}

}




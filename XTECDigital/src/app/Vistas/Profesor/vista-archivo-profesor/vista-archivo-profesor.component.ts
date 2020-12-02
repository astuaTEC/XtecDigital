import { Component, OnInit } from '@angular/core';
import { ArchivosProfesorService } from 'src/app/Vistas/Profesor/ServiciosProfesor/archivos-profesor.service';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-vista-archivo-profesor',
  templateUrl: './vista-archivo-profesor.component.html',
  styleUrls: ['./vista-archivo-profesor.component.css']
})
export class VistaArchivoProfesorComponent implements OnInit {

  documento: any = null;

  constructor(private route: ActivatedRoute, private router: Router, private archivosService: ArchivosProfesorService) { }

  ngOnInit(): void {
    const base64 = this.parsearBase64(this.archivosService.archivo);
    this.documento = this.dostuff(base64);
    console.log(this.documento);
  }

  dostuff(b64Data){
    const byteCharacters = atob(b64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    //const blob = new Blob([byteArray], {type: 'application/pdf'});
    //console.log(blob)
    return byteArray
  }

  parsearBase64(file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(reader.result);
      return reader.result;
  
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
      return error;
    };
  }
 


}

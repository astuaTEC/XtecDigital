import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';


@Component({
  selector: 'app-entregables-profesor',
  templateUrl: './entregables-profesor.component.html',
  styleUrls: ['./entregables-profesor.component.css']
})
export class EntregablesProfesorComponent implements OnInit {

  //Variable que almacena el nombre de la evaluación
  nombreEvaluacion: string = '';

  //Variable que almacena el porcentaje total de la evaluación
  porcentajeEvaluacion: string = '';

  //Variable del archivo que se escoje desde la PC
  fileToUpload: File;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.forEach((urlParams) => {
      this.nombreEvaluacion = urlParams['nombreEvaluacion'];
      this.porcentajeEvaluacion = urlParams['porcentajeEvaluacion'];
    });
  }

  agregarNuevoArchivo(files: FileList) {
    //Se carga el archivo desde el elemento HTML
    this.fileToUpload = files.item(0);
  }

  cerrar(){
    this.router.navigate(['/ProfesorGrupo/Evaluaciones/Ver']);
  }

}

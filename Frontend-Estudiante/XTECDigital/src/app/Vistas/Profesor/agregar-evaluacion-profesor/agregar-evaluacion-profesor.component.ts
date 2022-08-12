import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Estudiante } from '../ModelosProfesor/estudiante';
import { Evaluacion } from '../ModelosProfesor/evaluacion';


@Component({
  selector: 'app-agregar-evaluacion-profesor',
  templateUrl: './agregar-evaluacion-profesor.component.html',
  styleUrls: ['./agregar-evaluacion-profesor.component.css']
})
export class AgregarEvaluacionProfesorComponent implements OnInit {

  //Modelo de la nueva evaluacion
  evaluacion: Evaluacion = new Evaluacion(
    '',
    0,
    '',
    '',
    '',
    '',
    '',
    [
      new Estudiante('Kevin', 'Acevedo', 'Rodriguez', '2018148661', ''),
      new Estudiante('Kevin', 'Guzmán', 'Pérez', '20181486612', ''),
      new Estudiante('Valeria', 'Gonzales', 'Baro', '2018148663', ''),
      new Estudiante('Ramón', 'Smith', 'Rosales', '2018148664', ''),
      new Estudiante('Carlos', 'Soto', 'Mata', '2018148665', ''),
      new Estudiante('Josue', 'Machado', 'Marín', '2018148666', ''),
      new Estudiante('Kevin', 'Peña', 'Lopez', '2018148667', ''),
      new Estudiante('Celeste', 'Acevedo', 'Brown', '2018148668', ''),
      new Estudiante('Nina', 'Ramírez', 'Ramírez', '2018148669', ''),
      new Estudiante('Saúl', 'Casillas', 'Araya', '2018148660', ''),
    ]
  );

  //Archivo a seleccionar
  fileToUpload: File;

  //Nombre del rubro correspondiente
  nombreRubro: string = '';

  //Porcentaje del rubro correspondiente
  porcentajeRubro: string = '';


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.forEach((urlParams) => {
      this.nombreRubro = urlParams['nombreRubro'];
      this.porcentajeRubro = urlParams['porcentajeRubro'];
    });

  }

  agregarNuevoArchivo(files: FileList) {
    //Se carga el archivo desde el elemento HTML
    this.fileToUpload = files.item(0);
    //almacenar el nombre del documento
    this.evaluacion.nombreEspecificacion = this.fileToUpload.name;
    //Crear el documento en Base64
    this.base64(this.fileToUpload, this.evaluacion);
  }

  base64(file:File, evaluacion: Evaluacion) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      evaluacion.especificacion = reader.result;
    };
    reader.onerror = (error) => {
      console.log('Error: ', error);
    };
  }

  agregarEvaluacion(){
   this.router.navigate(['/ProfesorGrupo/Evaluaciones']);
  }

  cerrar(){
    this.router.navigate(['/ProfesorGrupo/Evaluaciones']);
  }

  

}

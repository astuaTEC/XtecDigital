import { Component, OnInit } from '@angular/core';
import { Carpeta } from '../ModelosProfesor/carpeta';
import { NombreCarpetaInput } from '../ModelosProfesor/nombre-carpeta-input';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-documentos-profesor',
  templateUrl: './documentos-profesor.component.html',
  styleUrls: ['./documentos-profesor.component.css']
})
export class DocumentosProfesorComponent implements OnInit {

  //Variable que determina cuándo se debe desplegar el input de agregar nueva carpeta
  nuevaCarpetaActivado: boolean = false;

  //Nombre de la nueva carepeta -> Con ngModel
  nuevaCarpeta: NombreCarpetaInput = new NombreCarpetaInput('');

  //Lista de las carpetas que deben provenir del servidor
  listaCarpetas: Carpeta[] = [
    new Carpeta('Presentaciones', true),
    new Carpeta('Quices', true),
    new Carpeta('Exámenes', true),
    new Carpeta('Proyectos', true)
  ];

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
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
    if(!carpeta.protegida){
      for(let i = 0; i < this.listaCarpetas.length; i++){
        if(carpeta === this.listaCarpetas[i]){
          this.listaCarpetas.splice(i, 1);
        }
      }
    }
    else{
      
    }
  }

  agregarNuevaCarpeta(){
    if(this.nuevaCarpeta.nombre != ''){
      this.listaCarpetas.push(
        new Carpeta(this.nuevaCarpeta.nombre, false)
      );
      this.activarNC();
      this.nuevaCarpeta.nombre = '';
    }
  }

  gotoArchivos(nombreCarpeta:string){
    this.router.navigate(['/ProfesorGrupo/Documentos', nombreCarpeta]);
  }

}

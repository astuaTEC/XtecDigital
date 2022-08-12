import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-evaluaciones-profesor',
  templateUrl: './evaluaciones-profesor.component.html',
  styleUrls: ['./evaluaciones-profesor.component.css']
})
export class EvaluacionesProfesorComponent implements OnInit {

  //Archivo a seleccionar
  fileToUpload: File = null;


  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

  }

  verEvaluaciones(){
    this.router.navigate(['/ProfesorGrupo/Evaluaciones/Ver']);
  }



}

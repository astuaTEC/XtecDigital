import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-grupo-profesor',
  templateUrl: './grupo-profesor.component.html',
  styleUrls: ['./grupo-profesor.component.css']
})
export class GrupoProfesorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  //El nombre del grupo seleccionado
  nombreGrupo: string ;

  //numero de cedula del profesor
  numeroCedula: string ;

  //Nombre del profesor que ha iniciado la sesión
  nombreProfesor: string;

  ngOnInit(): void {
    console.log(this.route.params);
    //primero se guarda el número de cédula del profesor
    this.route.params.forEach((urlParams) => {
      this.numeroCedula = urlParams['cedulaProfesor'];
      this.nombreProfesor = urlParams['nombreProfesor'];
      this.nombreGrupo = urlParams['nombreGrupo'];
    });
  }
  

  gotoDocumentos(){
    this.router.navigate(['/ProfesorGrupo',this.numeroCedula, this.nombreProfesor, this.nombreGrupo, 'Documentos']);
  }

  gotoRubros(){
    this.router.navigate(['/ProfesorGrupo',this.numeroCedula, this.nombreProfesor, this.nombreGrupo, 'Rubros']);
  }

  gotoEvaluaciones(){
    this.router.navigate(['/ProfesorGrupo',this.numeroCedula, this.nombreProfesor,  this.nombreGrupo, 'Evaluaciones']);
  }

  gotoNoticias(){
    this.router.navigate(['/ProfesorGrupo',this.numeroCedula, this.nombreProfesor,  this.nombreGrupo, 'Noticias']);

  }

  gotoHome(){
    this.router.navigate(['/ProfesorHome', this.numeroCedula, this.nombreProfesor]);
  }

}

import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Curso } from 'src/app/modelos/curso';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CursosComponent implements OnInit {
panelOpenState = false;
cursos: Curso[] ;
formVisibility = false;
curso: Curso = new Curso();

  constructor() { }

  ngOnInit(): void {
  	this.cursos = [

  	{
  		codigo : "CE3404",
creditos: 4,
carrera: "Ingenieria en Computadores",
nombre: "Algoritmos y estructuras de datos II",
habilitado: true

  	},
  	{
  		codigo : "CE3404",
creditos: 4,
carrera: "Ingenieria en Computadores",
nombre: "Bases de datos",
habilitado: true

  	},
  	{
  		codigo : "CE3404",
creditos: 4,
carrera: "Ingenieria en Computadores",
nombre: "Lenguajes, compiladores e interpretes",
habilitado: true

  	},
  	{
  		codigo : "CE3404",
creditos: 4,
carrera: "Ingenieria en Computadores",
nombre: "Introduccion a la programacion",
habilitado: false

  	},
  	{
  		codigo : "CE3404",
creditos: 4,
carrera: "Ingenieria en Computadores",
nombre: "Especificacion y dise;o de software",
habilitado: false

  	}
  	];
}
agregar(){
  this.formVisibility = true;
  this.curso = new Curso();

}
submit(){
console.log(this.curso);
this.formVisibility = false;
this.cursos.push(this.curso);
}

deshabilitar(curso){
console.log(curso);
this.curso = curso;
}
habilitar(curso){
console.log(curso);
this.curso = curso;
}


}

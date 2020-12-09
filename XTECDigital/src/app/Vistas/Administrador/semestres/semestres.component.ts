import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-semestres',
  templateUrl: './semestres.component.html',
  styleUrls: ['./semestres.component.css']
})
export class SemestresComponent implements OnInit {
formVisibility = false;
file: any;
anios: number[] = [];

  constructor() { }

  ngOnInit(): void {
  var today = new Date();
var year = today.getFullYear();
  	 for(let i = 0 ; i < 11; i++) {
  	 	let anio = year + i;
  	 	this.anios.push(anio)
      
      }
  }

  submit(){

  }

 getFile(event){
let files = event.srcElement.files;
console.log(files);



  }

}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-noticias-profesor',
  templateUrl: './noticias-profesor.component.html',
  styleUrls: ['./noticias-profesor.component.css'],

  
})
export class NoticiasProfesorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { 

  }

  ngOnInit(): void {
  }

  nuevaNoticia(){
    this.router.navigate(['ProfesorGrupo/NuevaNoticia']);
  }

}

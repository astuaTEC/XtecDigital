import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-login-profesor',
  templateUrl: './login-profesor.component.html',
  styleUrls: ['./login-profesor.component.css']
})
export class LoginProfesorComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  gotoHome(){
    this.router.navigate(['/ProfesorHome']);
  }

}

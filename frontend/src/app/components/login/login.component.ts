import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import jwt_decode from "jwt-decode";
import { LoginErrorComponent } from '../error/login-error/login-error.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  usuario: any = {
    username: "",
    password: "",
  }

  constructor(private usersService: UsersService, private router: Router,private errorService: NgbModal) { }

  ngOnInit(): void {
  }

  login() {
    this.usersService.login(this.usuario)
      .subscribe(token => {
        localStorage.setItem("token", token);
        this.router.navigate(['/conciertos']);
      },
      err => this.errorService.open(LoginErrorComponent)
      )
  }

 /*  let decoded = jwt_decode(token);
        console.log(decoded) */
}

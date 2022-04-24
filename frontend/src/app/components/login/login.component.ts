import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

/*   usuario: any = {
    id: 0,
  nombre: "",
  emial: "",
  usuario: "",
  password: "",
  rol: 1,
  } */

  usuario: any = {
    usuario: "",
    password: "",
  }

  constructor(private usersService: UsersService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.usersService.login(this.usuario)
      .subscribe(data => {
        console.log(data)
      })
  }

}

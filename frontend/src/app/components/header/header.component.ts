import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usuario: any = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  cerrarSesion(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  getIdUser(): void {
    let user = localStorage.getItem('token');
    this.router.navigate(['/usuario/'+this.decode(user).id]);
  }
  decode(token: string | any) {
    let decodeId = jwt_decode(token);
    this.usuario = decodeId;
    return this.usuario;
  }

  isLoged() {
    let user = localStorage.getItem('token');
    if(user){
      return true;
    }else {
      return false;
    }
  }

}

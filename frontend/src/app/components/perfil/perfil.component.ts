import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Usuario } from 'src/models/Usuario';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  usuario: Usuario | any = {
    nombre: ''
  };
  id: any;

  constructor(private activatedRoute: ActivatedRoute, private usuariosService: UsersService) { }

  ngOnInit(): void {
    this.getId();
    this.consulta();
  }
  getId(){
    let token: any = localStorage.getItem('token');
    let decodeToeken = jwt_decode(token)
    let usuarioToken: any = decodeToeken;
    this.id = usuarioToken.id;
  }

  consulta(): void { //datos del usuario

    if (this.id){
      this.usuariosService.getUsuario(this.id)
        .subscribe(
          res => {
            this.usuario = res;
            console.log("usuario: ",this.usuario);
          },
          err => console.error(err)
        )
    }
  }


}

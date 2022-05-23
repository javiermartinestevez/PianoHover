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

  constructor(private activatedRoute: ActivatedRoute, private usuariosService: UsersService) { }

  ngOnInit(): void {
    this.consulta();
  }

  consulta(): void { //datos del usuario
    const params = this.activatedRoute.snapshot.params['id'];
    if (params){
      this.usuariosService.getUsuario(params)
        .subscribe(
          res => {
            this.usuario = res;
          },
          err => console.error(err)
        )
    }
  }


}

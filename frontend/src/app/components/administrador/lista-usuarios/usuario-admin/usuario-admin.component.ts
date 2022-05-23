import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/models/Usuario';
import { AsientosService } from 'src/app/services/asientos.service';
import { Concierto } from 'src/models/Concierto';

@Component({
  selector: 'app-usuario-admin',
  templateUrl: './usuario-admin.component.html',
  styleUrls: ['./usuario-admin.component.scss']
})
export class UsuarioAdminComponent implements OnInit {

  usuario: Usuario | any = {};
  entradas: any = [];

  constructor(
    private userService: UsersService,
    private asientosService: AsientosService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.consultaUsuario();
    this.consultaEntradas();
  }

  consultaUsuario(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]){
      this.userService.getUsuario(params["id"])
        .subscribe(
          res => {
            this.usuario = res;
          },
          err => console.error(err)
        )
    }
  }
  consultaEntradas() {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]){
      this.asientosService.listaAsientosUsuario(params["id"])
        .subscribe(
          res => {
            this.entradas = res;
          },
          err => console.log(err)
        )
    }
  }
  descargar() {}

}

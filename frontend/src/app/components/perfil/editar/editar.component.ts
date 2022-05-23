import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/models/Usuario';
import jwt_decode from "jwt-decode";
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoEliminarComponent } from '../../dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  @Input() params: any;

  usuarioToken: any = {};

  usuario: Usuario | any = {
    id: 0,
    nombre: '',
    email: '',
    usuario: '',
    password: '',
    rol: 0
  };
  passwordAuth1: string = '';
  passwordAuth2: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.consulta();
  }

  consulta(): void { //datos del usuario
    const params = this.activatedRoute.snapshot.params['id'];
    if (params) {
      this.usuariosService.getUsuario(params)
        .subscribe(
          res => {
            this.usuario = res;
          },
          err => console.error(err)
        )
    }
  }
  modificarUsuario(id: any, usuario:any) {
    this.usuariosService.modificarUsuario(id, usuario)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err)
      )
  }

  editarUsuario() {
    const params = this.activatedRoute.snapshot.params['id'];
    delete this.usuario.id;
    delete this.usuario.password;
    delete this.usuario.rol;
    this.modificarUsuario(params, this.usuario);
    this.router.navigate(['/perfil/' + params]);
  }

  editarPass() {
    const params = this.activatedRoute.snapshot.params['id'];
    if (this.passwordAuth1.length >= 6) {
      if (this.passwordAuth1 === this.passwordAuth2) {
        this.usuario.password = this.passwordAuth1;

        this.modificarUsuario(params, this.usuario);
        this.router.navigate(['/perfil/' + params]);
      }
    }
  }
  setRol(admin: boolean) {//Cambiar el rol del usuario, solo ADMIN
    const params = this.activatedRoute.snapshot.params['id'];

    let dialogRef = this.dialog.open(DialogoEliminarComponent, {
      data: '¿Está seguro de cambiar el ROL de "' + this.usuario.nombre + '"?'
    });

    dialogRef.afterClosed()
      .subscribe(
        res => {
          if (res) {
            if (admin) {
              this.usuario.rol = 1;
              this.modificarUsuario(params, this.usuario);
                this.router.navigate(['/administrador/lista-usuarios/' + params]);
            } else {
              this.usuario.rol = 0;
              this.modificarUsuario(params, this.usuario);
                this.router.navigate(['/administrador/lista-usuarios/' + params]);
            }
          }
        },
        err => console.log(err)
      )
  }

  decode(token: string | any) {
    let decodeId = jwt_decode(token);
    this.usuarioToken = decodeId;
    return this.usuarioToken;
  }

  isAdmin() {
    let user = localStorage.getItem('token');
    if (this.decode(user).rol === 1) {
      return true;
    } else {
      return false;
    }
  }


}

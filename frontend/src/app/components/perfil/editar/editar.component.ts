import { Component, Input, OnInit } from '@angular/core';
import { Usuario } from 'src/models/Usuario';
import jwt_decode from "jwt-decode";
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.scss']
})
export class EditarComponent implements OnInit {

  @Input() params: any;

  usuario: Usuario | any = {
    id: 0,
    nombre: '',
    email: '',
    usuario: '',
    password: '',
    rol: 0
  };
  id: any;
  passwordAuth1: string = '';
  passwordAuth2: string = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsersService) { }

  ngOnInit(): void {
    this.getId();
    this.consulta();
  }
  getId() {
    let token: any = localStorage.getItem('token');
    let decodeToeken = jwt_decode(token)
    let usuarioToken: any = decodeToeken;
    this.id = usuarioToken.id;
  }

  consulta(): void { //datos del usuario

    if (this.id) {
      this.usuariosService.getUsuario(this.id)
        .subscribe(
          res => {
            this.usuario = res;
          },
          err => console.error(err)
        )
    }
  }

  editarUsuario() {
    delete this.usuario.id;
    delete this.usuario.password;
    delete this.usuario.rol;
    this.usuariosService.modificarUsuario(this.id, this.usuario)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/perfil/' + this.id]);
        },
        err => console.error(err)
      )
  }

  editarPass() {
    if (this.passwordAuth1.length >= 6) {
      if (this.passwordAuth1 === this.passwordAuth2) {
        this.usuario.password = this.passwordAuth1;

        this.usuariosService.modificarUsuario(this.id, this.usuario)
          .subscribe(
            res => {
              console.log(res);
              this.router.navigate(['/perfil/' + this.id]);
            },
            err => console.error(err)
          )
      }
    }
  }


}

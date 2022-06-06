import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { Usuario } from 'src/models/Usuario';
import { DialogoEliminarComponent } from '../dialogo-eliminar/dialogo-eliminar.component';
import { DialogoRegistroComponent } from '../dialogo-registro/dialogo-registro.component';
import { TerminosComponent } from '../terminos/terminos.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  usuario: Usuario | any = {
    id: 0,
    nombre: "",
    email: "",
    usuario: "",
    password: "",
    rol: 0,
  }
  usuarios: Usuario | any = [];
  passwordAuth: string = "";
  terminos: boolean = false;

  constructor(
    private usersService: UsersService,
    private router: Router,
    private terminosService: NgbModal,
    errorService: NgbModal,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  registrar(): void {
    if (this.usuario.password.length >= 6) {

      if (this.usuario.password === this.passwordAuth) {
        let existeUsuario = this.usuarios.find((user: any) => user.usuario === this.usuario.usuario);
        if (existeUsuario ? false : true) {
          let existeCorreo = this.usuarios.find((user: any) => user.email === this.usuario.email);
          if (existeCorreo ? false : true) {
            delete this.usuario.id;
            delete this.usuario.rol;
            this.usersService.agregarUsuario(this.usuario)
              .subscribe(
                res => {
                  console.log(res);
                  this.router.navigate(['/login']);
                },
                err => console.log(err)
              )
          } else {
            this.dialog.open(DialogoRegistroComponent, {
              data: 'El correo electrónico ya está en uso'
            });
          }

        } else {
          this.dialog.open(DialogoRegistroComponent, {
            data: 'El nombre de usuario ya está en uso'
          });
        }

      } else {
        this.dialog.open(DialogoRegistroComponent, {
          data: 'La contraseña no coincide'
        });
      }
    } else {
      this.dialog.open(DialogoRegistroComponent, {
        data: 'La contraseña debe tener minimo 6 caracteres'
      });
    }
  }

  getUsuarios() {
    this.usersService.getUsuarios()
      .subscribe(
        res => {
          this.usuarios = res;
        },
        err => console.error(err)
      )
  }

  abrirTerminos(): void {
    this.terminosService.open(TerminosComponent);
  }
}

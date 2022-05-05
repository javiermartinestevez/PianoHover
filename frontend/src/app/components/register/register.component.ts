import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from 'src/app/services/users.service';
import { Usuario } from 'src/models/Usuario';
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
  passwordAuth: string = "";
  terminos: boolean = false;

  constructor(private usersService: UsersService, private router: Router, private terminosService: NgbModal) { }

  ngOnInit(): void {
  }

  registrar(): void {

    if (this.usuario.password.length >= 6) {

      if (this.usuario.password === this.passwordAuth) {

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

        }else {
          console.log("La contraseña no coincide")
        }
    }else {
      console.log("La contraseña debe tener minimo 6 caracteres")
    }
  }

  abrirTerminos(): void {
    this.terminosService.open(TerminosComponent);
  }
}

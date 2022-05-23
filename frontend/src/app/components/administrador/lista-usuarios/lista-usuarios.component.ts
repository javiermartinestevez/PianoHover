import { Component, Inject, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogoEliminarComponent } from '../../dialogo-eliminar/dialogo-eliminar.component';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent implements OnInit {

  usuarios: any = [];


  constructor(
    private usersService: UsersService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getUsuarios();
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

  eliminarUsuario(idUsuario: any, nombreUsuario: any) {
    let dialogRef = this.dialog.open(DialogoEliminarComponent, {
      data: '¿Está seguro de eliminar al usuario "'+nombreUsuario+'"?'
    });
    dialogRef.afterClosed()
    .subscribe(
      res => {
        console.log("res", res)

        if(res){
          this.usersService.eliminarUsuario(idUsuario.toString())
            .subscribe(
              res => {
                console.log(res);
                this.getUsuarios();
              },
              err => console.log(err)
            )
        }
      },
      err => console.log(err)
    )
  }

}

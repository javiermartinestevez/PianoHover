import { Component, OnInit } from '@angular/core';
import { ConciertosService } from 'src/app/services/conciertos.service';
import jwt_decode from "jwt-decode";

import * as moment from 'moment';
import { MatDialog } from '@angular/material/dialog';
import { DialogoEliminarComponent } from '../dialogo-eliminar/dialogo-eliminar.component';
import { Concierto } from 'src/models/Concierto';
moment.locale('es');

@Component({
  selector: 'app-conciertos',
  templateUrl: './conciertos.component.html',
  styleUrls: ['./conciertos.component.scss']
})
export class ConciertosComponent implements OnInit {


  conciertos: any = [];
  usuario: any = {};
  fechaActual: any;
  moment: any = moment;

  constructor(
    private conciertosService: ConciertosService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {

    this.listarConciertos();
    this.fechaActual = moment(new Date());
  }

  listarConciertos(): void {
    this.conciertosService.getConciertosPublicos()
    .subscribe(
      res => {
        this.conciertos = res;
      },
      err => console.log(err)
    );
  }

  eliminarConcierto(id: string, nombreConcierto: string): void {
    let concierto: Concierto;
    let dialogRef = this.dialog.open(DialogoEliminarComponent, {
      data: '¿Está seguro de eliminar el concierto publico "'+nombreConcierto+'"?'
    });
    dialogRef.afterClosed()
    .subscribe(
      res => {
        if(res){
              //lo elimina de la tabla de conciertos publicos
          this.conciertosService.eliminarConcierto(id, concierto)
          .subscribe(
            res => {
              this.listarConciertos();
            },
            err => console.log(err)
          )
        }
      },
      err => console.log(err)
    )
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

  isAdmin() {
    if(this.isLoged()){
      let user = localStorage.getItem('token');
      if(this.decode(user).rol === 1){
        return true;
      }else {
        return false;
      }
    }
    return false;
  }

}

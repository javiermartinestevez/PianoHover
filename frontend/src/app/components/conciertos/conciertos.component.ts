import { Component, OnInit } from '@angular/core';
import { ConciertosService } from 'src/app/services/conciertos.service';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-conciertos',
  templateUrl: './conciertos.component.html',
  styleUrls: ['./conciertos.component.scss']
})
export class ConciertosComponent implements OnInit {

  conciertos: any = [];
  usuario: any = {};

  constructor(private conciertosService: ConciertosService) { }

  ngOnInit(): void {

    this.listarConciertos();

  }

  listarConciertos(): void {
    this.conciertosService.getConciertos()
    .subscribe(
      res => {
        this.conciertos = res;
      },
      err => console.log(err)
    );
  }

  eliminarConcierto(id: string) {
    this.conciertosService.eliminarConcierto(id).subscribe(
      res => {
        console.log(res);
        this.listarConciertos();
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

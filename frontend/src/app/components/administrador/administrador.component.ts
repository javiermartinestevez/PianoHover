import { Component, OnInit } from '@angular/core';
import { AsientosService } from 'src/app/services/asientos.service';
import { ConciertosService } from 'src/app/services/conciertos.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.scss']
})
export class AdministradorComponent implements OnInit {

  concierto: any = {};
  masVendido: any = [];
  cantidad: number = 0;

  usuario: any = {};
  masCompras: any = [];
  cantidadCompras: number = 0;

  constructor(
    private conciertosService: ConciertosService,
    private asientosService: AsientosService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.conciertoMasVendido();
    this.usuarioMasCompras();
  }

  conciertoMasVendido(){
    this.asientosService.conciertoMasVendido()
      .subscribe(
        res => {
          this.masVendido = res;
          this.cantidad = this.masVendido[0].cantidad;
          this.getConcierto(this.masVendido[0].idConcierto);
        }
      )
  }
  getConcierto(idConcierto: any){
    this.conciertosService.getConcierto(idConcierto)
      .subscribe(
        res => {
          this.concierto = res;
        }
      )
  }

  usuarioMasCompras(){
    this.asientosService.usuarioMasCompras()
    .subscribe(
      res => {
        this.masCompras = res;
        this.cantidadCompras = this.masCompras[0].cantidad;
        this.getUsuario();
      }
    )
  }

  getUsuario(){
    this.usersService.getUsuario(this.masCompras[0].idUsuario)
    .subscribe(
      res => {
        this.usuario = res;
      }
    )
  }

}

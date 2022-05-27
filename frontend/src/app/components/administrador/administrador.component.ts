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
  conciertos: any = [];
  masVendido: any = [];
  cantidad: number = 0;
  mes: any = {};
  mesPasado: any = {};

  usuario: any = {};
  masCompras: any = [];
  cantidadCompras: number = 0;

  constructor(
    private conciertosService: ConciertosService,
    private asientosService: AsientosService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.listarConciertos();
    this.conciertoMasVendido();
    this.usuarioMasCompras();
    this.vendidoMes();
    this.vendidoMesPasado();
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

  vendidoMes(){
    this.asientosService.vendidoMes()
      .subscribe(
        res => {
          this.mes = res;
          console.log(this.mes[0].cantidad)
        }
      )
  }

  vendidoMesPasado(){
    this.asientosService.vendidoMesPasado()
      .subscribe(
        res => {
          this.mesPasado = res;
          console.log(this.mesPasado[0].cantidad);
        }
      )
  }

}

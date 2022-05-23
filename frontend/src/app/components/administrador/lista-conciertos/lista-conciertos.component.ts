import { Component, OnInit } from '@angular/core';
import { AsientosService } from 'src/app/services/asientos.service';
import { ConciertosService } from 'src/app/services/conciertos.service';

@Component({
  selector: 'app-lista-conciertos',
  templateUrl: './lista-conciertos.component.html',
  styleUrls: ['./lista-conciertos.component.scss']
})
export class ListaConciertosComponent implements OnInit {

  conciertos: any = [];
  masVendido: any = [];
  concierto: any = {};
  cantidad: number = 0;

  constructor(
    private conciertosService: ConciertosService,
    private asientosService: AsientosService
  ) { }

  ngOnInit(): void {
    this.listarConciertos();
    this.conciertoMasVendido();
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
          this.getConcierto(this.masVendido[0].idConcierto)
        }
      )
  }
  getConcierto(idConcierto: any){
    this.conciertosService.getConcierto(idConcierto)
      .subscribe(
        res => {
          this.concierto = res;
          console.log(this.concierto.titulo);
        }
      )
  }

}

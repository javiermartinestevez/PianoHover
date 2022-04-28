import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AsientosService } from 'src/app/services/asientos.service';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {

  selccion: string = '';
  estado: string = 'active';
  active: string = 'active';
  estadoActive: boolean = true;

  asientos: any;

  fila_1: any = [];
  fila_2: any = [];
  fila_3: any = [];
  fila_4: any = [];
  fila_5: any = [];
  fila_6: any = [];
  fila_7: any = [];

  asientosSeleccionados: any = [];

  constructor(private asientosService: AsientosService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listarAsientos();
  }

  listarAsientos(): void {
    const params = this.activatedRoute.snapshot.params;
    this.asientosService.getAsientos(params["id"]).subscribe(
      res => {
        this.asientos = res;
        this.asientosVendidos();
      },
      err => console.log(err)
    );
  }

  asientosVendidos() {
    for(let i of this.asientos){
      if(i.fila === 1){
        this.fila_1.push(i.letra);
      }else if(i.fila === 2){
        this.fila_2.push(i.letra);
      }else if(i.fila === 3){
        this.fila_3.push(i.letra);
      }else if(i.fila === 4){
        this.fila_4.push(i.letra);
      }else if(i.fila === 5){
        this.fila_5.push(i.letra);
      }else if(i.fila === 6){
        this.fila_6.push(i.letra);
      }else if(i.fila === 7){
        this.fila_7.push(i.letra);
      }
    }
  }
  contador: number = 0;
  na: any;
  seleccionarAsiento(fila: number, letra: string) {
    let eliminado: boolean = true;

    let sitio = {fila: fila, letra: letra};

    if (this.asientosSeleccionados.length === 0) {
      this.asientosSeleccionados.push(sitio);

    }else {

      for(let i of this.asientosSeleccionados){ //rrecorre la lista de asientos seleccionados

        this.contador ++;
        if(i.fila === fila && i.letra === letra){ //si encuentra unos como el que pulsa lo elimina de la lista
          this.asientosSeleccionados.splice(this.contador-1, 1);
          eliminado = false;
          break;
        }else {
          eliminado = true;
        }
      }
      if(eliminado){
        this.asientosSeleccionados.push({fila: fila, letra: letra});
      }
    }
    this.contador = 0;
    this.mostrar();
  }

  mostrar() {
    console.log("asientos:",this.asientosSeleccionados)
  }


}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {

  estado: string = '';
  estadoActive: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  cambiarEstado(e: any) {
    this.estado = (this.estadoActive) ? "active" : "";
    this.estadoActive = !this.estadoActive;
  }

}

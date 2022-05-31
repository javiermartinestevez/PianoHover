import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Asiento } from 'src/models/Asiento';

@Injectable({
  providedIn: 'root'
})
export class AsientosService {

  API_URL = 'http://pianohover2.ddns.net/api';

  constructor(private http: HttpClient) { }

  getAsientos(id: string) {
    return this.http.get(`${this.API_URL}/asientos/${id}`);
  }
  listaAsientosUsuario(id: string) {
    return this.http.get(`${this.API_URL}/asientos/usuario/${id}`);
  }
  getUltimoAsientos() {
    return this.http.get(`${this.API_URL}/asientos`);
  }
  conciertoMasVendido() {
    return this.http.get(`${this.API_URL}/asientos/vendido`);
  }
  usuarioMasCompras() {
    return this.http.get(`${this.API_URL}/asientos/comprado`);
  }
  crearAsiento(asiento: Asiento) {
    return this.http.post(`${this.API_URL}/asientos`, asiento);
  }
  vendidoMes() {
    return this.http.get(`${this.API_URL}/asientos/mes`);
  }
  vendidoMesPasado() {
    return this.http.get(`${this.API_URL}/asientos/mespasado`);
  }
}

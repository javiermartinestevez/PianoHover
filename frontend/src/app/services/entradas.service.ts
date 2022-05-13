import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Entrada } from 'src/models/Entrada';

@Injectable({
  providedIn: 'root'
})
export class EntradasService {

  API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getEntradas(id: string) {
    return this.http.get(`${this.API_URL}/entradas/${id}`);
  }
  crearEntrada(entrada: Entrada) {
    return this.http.post(`${this.API_URL}/entradas`, entrada);
  }
}

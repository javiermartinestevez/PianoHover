import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Concierto } from 'src/models/Concierto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConciertosService {

  API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getConciertos() {
    return this.http.get(`${this.API_URL}/conciertos`);
  }
  getConciertosPublicos() {
    return this.http.get(`${this.API_URL}/conciertos/publicos`);
  }
  getUltimoConcierto() {
    return this.http.get(`${this.API_URL}/conciertos/ultimo`);
  }

  getConcierto(id: string) {
    return this.http.get(`${this.API_URL}/conciertos/${id}`);
  }

  agregarConcierto(concierto: Concierto) {
    return this.http.post(`${this.API_URL}/conciertos`, concierto);
  }
  agregarConciertoPublico(concierto: Concierto) {
    return this.http.post(`${this.API_URL}/conciertos/publico`, concierto);
  }

  eliminarConcierto(id: string) {
    return this.http.delete(`${this.API_URL}/conciertos/${id}`);
  }

  modificarConcierto(id: string | number, modificadoConcierto: Concierto): Observable<any> {
    return this.http.put(`${this.API_URL}/conciertos/${id}`, modificadoConcierto);
  }
  modificarConciertoPublico(id: string | number, modificadoConcierto: Concierto): Observable<any> {
    return this.http.put(`${this.API_URL}/conciertos/publico/${id}`, modificadoConcierto);
  }

}

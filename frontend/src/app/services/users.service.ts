import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Usuario } from 'src/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  API_URL = 'http://pianohover2.ddns.net/api';

  constructor(private http: HttpClient) { }


  login(user : any): Observable<any> {
    return this.http.post(`${this.API_URL}/usuarios/login`, user);
  }
  getUsuarios() {
    return this.http.get(`${this.API_URL}/usuarios`);
  }

  getUsuario(id: string) {
    return this.http.get(`${this.API_URL}/usuarios/${id}`);
  }

  agregarUsuario(usuario: Usuario) {
    return this.http.post(`${this.API_URL}/usuarios`, usuario);
  }

  eliminarUsuario(id: string) {
    return this.http.delete(`${this.API_URL}/usuarios/${id}`);
  }

  modificarUsuario(id: string | number, usuario: Usuario | any): Observable<any> {
    return this.http.put(`${this.API_URL}/usuarios/${id}`, usuario);
  }
}

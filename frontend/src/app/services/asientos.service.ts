import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AsientosService {

  API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getAsientos(id: string) {
    return this.http.get(`${this.API_URL}/asientos/${id}`);
  }
}

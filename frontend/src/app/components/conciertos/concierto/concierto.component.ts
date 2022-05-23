import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConciertosService } from 'src/app/services/conciertos.service';
import { Concierto } from 'src/models/Concierto';

import * as moment from 'moment';
moment.locale('es');

@Component({
  selector: 'app-concierto',
  templateUrl: './concierto.component.html',
  styleUrls: ['./concierto.component.scss']
})
export class ConciertoComponent implements OnInit {

  moment: any = moment;
  fechaActual: any;

  concierto: Concierto | any = {
    id: 0,
    titulo: '',
    descripcion: '',
    fecha: new Date(),
    imagen: '',
    precioNormal: 0,
    precioVIP: 0,
    asientos: 0,
    fecha_crt: new Date()
  };

  constructor(private conciertosService: ConciertosService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.fechaActual = moment(new Date());
    this.consulta();
  }

  consulta(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]){
      this.conciertosService.getConcierto(params["id"])
        .subscribe(
          res => {
            this.concierto = res;
          },
          err => console.error(err)
        )
    }
  }


}

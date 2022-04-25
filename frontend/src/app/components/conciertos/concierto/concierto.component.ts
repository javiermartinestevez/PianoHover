import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConciertosService } from 'src/app/services/conciertos.service';
import { Concierto } from 'src/models/Concierto';

@Component({
  selector: 'app-concierto',
  templateUrl: './concierto.component.html',
  styleUrls: ['./concierto.component.scss']
})
export class ConciertoComponent implements OnInit {

  concierto: Concierto | any = {
    id: 0,
    titulo: '',
    descripcion: '',
    fecha: new Date(),
    imagen: '',
    asientos: 0,
    fecha_crt: new Date()
  };

  estado: string = '';
  estadoActive: boolean = true;

  constructor(private conciertosService: ConciertosService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
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


  cambiarEstado(e: any) {
    this.estado = (this.estadoActive) ? "active" : "";
    this.estadoActive = !this.estadoActive;
  }

}

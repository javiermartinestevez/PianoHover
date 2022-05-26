import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Concierto } from 'src/models/Concierto';
import { ConciertosService } from '../../services/conciertos.service';

@Component({
  selector: 'app-conciertos-form',
  templateUrl: './conciertos-form.component.html',
  styleUrls: ['./conciertos-form.component.scss']
})
export class ConciertosFormComponent implements OnInit {

  concierto: Concierto | any = {
    id: 0,
    titulo: '',
    descripcion: '',
    fecha: new Date(),
    imagen: '',
    precioNormal: null,
    precioVip: null,
    asientos: 0,
    fecha_crt: new Date(),
    eliminado: 0
  };
  ultimoConcierto: any = [];

  editar: boolean = false;

  constructor(private conciertosService: ConciertosService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]) {
      this.conciertosService.getConcierto(params["id"])
        .subscribe(
          res => {
            this.concierto = res;
            this.editar = true;
          },
          err => console.error(err)
        )
    }
  }
  getUltimoConcierto(){
    this.conciertosService.getUltimoConcierto()
      .subscribe(
        res => {
          this.ultimoConcierto = res;
        },
        err => console.error(err)
      )
  }

  guardarConcierto() {
    delete this.concierto.id;
    delete this.concierto.asientos;
    delete this.concierto.fecha_crt;
    this.conciertosService.agregarConcierto(this.concierto)
      .subscribe(
        res => {
          console.log(res);
          this.router.navigate(['/conciertos']);
        },
        err => console.log(err)
      )
  }

  editarConcierto() {
    delete this.concierto.fecha_crt;
    this.conciertosService.modificarConcierto(this.concierto.id, this.concierto)
      .subscribe(
        res => {
          console.log(res);
        },
        err => console.error(err)
      )
  }



}

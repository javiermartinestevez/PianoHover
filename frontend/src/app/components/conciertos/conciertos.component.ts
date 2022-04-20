import { Component, OnInit } from '@angular/core';
import { ConciertosService } from 'src/app/services/conciertos.service';
import { Concierto } from 'src/models/Concierto';

@Component({
  selector: 'app-conciertos',
  templateUrl: './conciertos.component.html',
  styleUrls: ['./conciertos.component.scss']
})
export class ConciertosComponent implements OnInit {

  conciertos: any = [];

  constructor(private conciertosService: ConciertosService) { }

  ngOnInit(): void {

    this.listarConciertos();

  }

  listarConciertos(): void {
    this.conciertosService.getConciertos().subscribe(
      res => {
        this.conciertos = res;
      },
      err => console.log(err)
    );
  }

  eliminarConcierto(id: string) {
    this.conciertosService.eliminarConcierto(id).subscribe(
      res => {
        console.log(res);
        this.listarConciertos();
      },
      err => console.log(err)
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import jwt_decode from "jwt-decode";
import { ConciertosService } from 'src/app/services/conciertos.service';
import { AsientosService } from 'src/app/services/asientos.service';
import { Concierto } from 'src/models/Concierto';

import * as moment from 'moment';
moment.locale('es');

import { PdfMakeWrapper, Img, Txt, Table } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {

  entradas: any = [];
  concierto: Concierto | any;
  fila: any;
  letra: any;
  idCompra: any;
  idTransaccion: any;

  titulo: any = "";

  idUsuario: any;
  usuario: any;

  logo: string = '../../../../../../assets/img/logo/logoPianoBotSlip.png';

  constructor(
    private asientosService: AsientosService,
    private conciertosService: ConciertosService,
    private usersService: UsersService
  ) { }

  ngOnInit(): void {
    this.getId();
    this.consulta();
    this.nombreUsuario();
  }
  getId() {
    let token: any = localStorage.getItem('token');
    let decodeToeken = jwt_decode(token)
    let usuarioToken: any = decodeToeken;
    this.idUsuario = usuarioToken.id;
  }

  consulta(): void { //datos de las entradas por id de usuario

    this.asientosService.listaAsientosUsuario(this.idUsuario)
      .subscribe(
        res => {
          this.entradas = res;
        },
        err => console.error(err)
      )
  }
  consultaConcierto(idConcierto: any): void {
    this.conciertosService.getConcierto(idConcierto)
      .subscribe(
        res => {
          this.concierto = res;
          this.descargarPdf();
        },
        err => console.error(err)
      )

  }

  descargar(idTransaccion: any, idConcierto: any, fila: any, letra: any) {
    this.idTransaccion = idTransaccion;
    this.fila = fila;
    this.letra = letra;
    this.consultaConcierto(idConcierto);
  }
  nombreUsuario() {
    this.usersService.getUsuario(this.idUsuario)
      .subscribe(
        res => {
          this.usuario = res;
        },
        err => console.log(err)
      );
  }

  async descargarPdf() {
    console.log("concierto 222:",this.idTransaccion)
    const pdf = new PdfMakeWrapper();

    pdf.info({
      title: 'Entradas',
      author: 'PianoHover @javime',
      subject: 'subject of document',
    });

    pdf.images({
      width: "300"
    });

    pdf.add(await (await new Img(this.logo).build()));
    pdf.add(' ');
    pdf.add(' ');
    pdf.add(' ');
    pdf.add(new Txt('Cliente: ').bold().end);
    pdf.add(this.usuario.nombre);

    pdf.add(' ');

    pdf.add(new Txt('Recogida: ').bold().end);
    pdf.add('Exclusivamente en la taquilla del recinto, desde una hora antes del evento.');
    pdf.add(' ');

    pdf.add('Deberás presentar este documento acompañado del DNI del comprador (original o fotocopia).');
    pdf.add(' ');

    pdf.add('ENTRADAS:');
    pdf.add(' ');

    pdf.add(new Table([
      [
        new Txt('Fecha').bold().end,
        new Txt('Evento').bold().end,
        new Txt('Localidad').bold().end,
        new Txt('EUR').bold().end,
      ],
      [
        moment(this.concierto.fecha).format('L'),
        this.concierto.titulo,
        this.fila + this.letra,
        this.fila === 1 || this.fila === 2 ? this.concierto.precioVip : this.concierto.precioNormal
      ]
    ]).end
    );
    pdf.add(' ');

    pdf.add(' ');
    pdf.add('ID transacción: ' + this.idTransaccion);

    pdf.add(' ');
    /* pdf.add('TOTAL: '+ this.total+'€'); */


    pdf.create().open();
    /* pdf.create().download("PianoHover Entradas "+this.concierto.titulo+".pdf"); */

  }

}

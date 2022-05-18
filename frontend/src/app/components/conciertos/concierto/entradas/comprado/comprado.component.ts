import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import * as moment from 'moment';
moment.locale('es');

import { PdfMakeWrapper, Img, Txt, Table } from 'pdfmake-wrapper';
import * as pdfFonts from "pdfmake/build/vfs_fonts";
import { UsersService } from 'src/app/services/users.service';
PdfMakeWrapper.setFonts(pdfFonts);

@Component({
  selector: 'app-comprado',
  templateUrl: './comprado.component.html',
  styleUrls: ['./comprado.component.scss']
})
export class CompradoComponent implements OnInit {


  @Input() total: any;
  @Input() items: any;
  @Input() precioVIP: any;
  @Input() precioNormal: any;
  @Input() nombre: any;
  @Input() fecha: any;
  @Input() idUsuario: any;
  @Input() idCompra: any;

  usuario: any;

  logo: string = '../../../../../../assets/img/logo/logoPianoBotSlip.png';

  constructor(
    public activeModal: NgbActiveModal,
    private usersService: UsersService
    ) { }

  ngOnInit(): void {
    this.nombreUsuario();
    moment
  }

  reload(): void {
    location.reload();
  }

  nombreUsuario() {
    this.usersService.getUsuario(this.idUsuario.toString())
    .subscribe(
      res => {
        this.usuario = res;
      },
      err => console.log(err)
    );
  }


  async descargarPdf() {

    const pdf = new PdfMakeWrapper();

    pdf.info({
      title: 'Entradas',
      author: 'PianoHover @javime',
      subject: 'subject of document',
    });

    pdf.images({
      width: "300"
    });

    pdf.add( await (await new Img(this.logo).build()) );
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

    for ( let item of this.items){
      pdf.add(new Table([
        [
          new Txt('Fecha').bold().end,
          new Txt('Evento').bold().end,
          new Txt('Localidad').bold().end,
          new Txt('EUR').bold().end,
        ],
        [
          moment(this.fecha).format('L'),
          this.nombre,
          item.fila+item.letra,
          item.fila === 1 || item.fila === 2 ? this.precioVIP : this.precioNormal
        ]
        ]).end
      );
      pdf.add(' ');
    }

    pdf.add(' ');
    pdf.add('ID transacción: '+ this.idCompra);

    pdf.add(' ');
    pdf.add('TOTAL: '+ this.total+'€');



    /* pdf.create().open(); */
    pdf.create().download("PianoHover Entradas "+this.nombre+".pdf");

  }

}

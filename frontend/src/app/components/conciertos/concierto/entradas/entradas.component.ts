import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { AsientosService } from 'src/app/services/asientos.service';
import { Asiento } from 'src/models/Asiento';
import { CompradoComponent } from './comprado/comprado.component';


@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {

  @Output() butacas = new EventEmitter<any>();

  public payPalConfig?: IPayPalConfig;

  estadoActive: boolean = true;
  pagar: boolean = false;

  asientos: any;

  fila_1: any = [];
  fila_2: any = [];
  fila_3: any = [];
  fila_4: any = [];
  fila_5: any = [];
  fila_6: any = [];
  fila_7: any = [];

  asientosSeleccionados: any = [];

  asiento: Asiento | any = {
    id: 0,
    letra: "",
    fila: 0,
    idConcierto: 0
  }

  total: number = 0;
  precioNormal: number = 49.99;
  precioVIP: number = 79.99;

  constructor(private asientosService: AsientosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private compradoService: NgbModal
    ) { }

  ngOnInit(): void {
    this.listarAsientos();
    this.initConfig();
  }

  private initConfig(): void { //Lógica de pago de PayPal
    this.payPalConfig = {
      currency: 'EUR',
      clientId: 'AVkF18Kfn4fA0GsGJFUdUk-fX5knI-mKlvAhL4gksa5Fw7jarGLtFR6ISvfR59exh12Vq9aLNxesm__i',
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'EUR',
            value: this.total.toString()  ,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.total.toString()
              }
            }
          },
          items: this.getItemsList()
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);;
        console.log("COMPRADO", data.purchase_units[0].items);
        this.crearAsiento();
        this.abrirComprado(
          this.asientosSeleccionados,
          data.purchase_units[0].amount.value,
          this.precioVIP,
          this.precioNormal
        );
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      }
    };
  }

  getItemsList(): any[] { //Añade los productos a la lógica de pago de PayPal
    const items: any[] = [];
    let item = {};
    this.asientosSeleccionados.forEach((it: any) => {
      item = {
        name: it.fila+it.letra,
        quantity: 1,
        unit_amount: {value: it.fila === 1 || it.fila === 2 ? this.precioVIP : this.precioNormal, currency_code: 'EUR'}
      };
      items.push(item);
    });
    return items;
  }


  enviarDatos(value: any) {
    this.butacas.emit(value);
  }

  listarAsientos(): void {//recibe todos los asientos del conciento
    const params = this.activatedRoute.snapshot.params;
    this.asientosService.getAsientos(params["id"]).subscribe(
      res => {
        this.asientos = res;
        this.asientosVendidos();
      },
      err => console.log(err)
    );
  }

  asientosVendidos() {//si en asiento está vendido se añade a la lista para que no esté en el html
    for (let i of this.asientos) {
      if (i.fila === 1) {
        this.fila_1.push(i.letra);
      } else if (i.fila === 2) {
        this.fila_2.push(i.letra);
      } else if (i.fila === 3) {
        this.fila_3.push(i.letra);
      } else if (i.fila === 4) {
        this.fila_4.push(i.letra);
      } else if (i.fila === 5) {
        this.fila_5.push(i.letra);
      } else if (i.fila === 6) {
        this.fila_6.push(i.letra);
      } else if (i.fila === 7) {
        this.fila_7.push(i.letra);
      }
    }
  }

  contadorSeleccion: number = 0;
  seleccionarAsiento(fila: number, letra: string) { //selecciona asientos para comprar
    let agregar: boolean = true;

    let sitio = { fila: fila, letra: letra };

    if (this.asientosSeleccionados.length === 0) {
      this.asientosSeleccionados.push(sitio);

      if (fila === 1 || fila === 2) {// Añade un precio
        this.total += this.precioVIP;
      } else {
        this.total += this.precioNormal;
      }

    } else {

      for (let i of this.asientosSeleccionados) { //rrecorre la lista de asientos seleccionados

        this.contadorSeleccion++;
        if (i.fila === fila && i.letra === letra) { //si encuentra unos como el que pulsa lo elimina de la lista
          this.asientosSeleccionados.splice(this.contadorSeleccion - 1, 1);

          if (fila === 1 || fila === 2) {// Resta un precio
            this.total -= this.precioVIP;
          } else {
            this.total -= this.precioNormal;
          }

          agregar = false;
          break;
        } else {
          agregar = true;
        }
      }
      if (agregar) {
        this.asientosSeleccionados.push({ fila: fila, letra: letra });

        if (fila === 1 || fila === 2) {// Añade un precio
          this.total += this.precioVIP;
        } else {
          this.total += this.precioNormal;
        }

      }
    }
    this.contadorSeleccion = 0;
  }

  crearAsiento() {
    const params = this.activatedRoute.snapshot.params['id'];
    delete this.asiento.id;

    for (let i of this.asientosSeleccionados) {
      this.asiento.fila = i.fila;
      this.asiento.letra = i.letra;
      this.asiento.idConcierto = Number(params);

      this.asientosService.crearAsiento(this.asiento)
        .subscribe(
          res => {
            console.log(res);

            console.log("JSON??", "JSON.stringify(res)");
          },
          err => console.log(err)
        );
    }

  }

  comprar():void {
    this.pagar = !this.pagar;
  }

  abrirComprado(items: any, total: any, precioVIP: any, precioNormal: any): void {
    const modalRef = this.compradoService.open(CompradoComponent);
    modalRef.componentInstance.items = items;
    modalRef.componentInstance.total = total;
    modalRef.componentInstance.precioVIP = precioVIP;
    modalRef.componentInstance.precioNormal = precioNormal;
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICreateOrderRequest, IPayPalConfig } from 'ngx-paypal';
import { AsientosService } from 'src/app/services/asientos.service';
import { Asiento } from 'src/models/Asiento';
import { Concierto } from 'src/models/Concierto';
import { CompradoComponent } from './comprado/comprado.component';
import jwt_decode from "jwt-decode";


@Component({
  selector: 'app-entradas',
  templateUrl: './entradas.component.html',
  styleUrls: ['./entradas.component.scss']
})
export class EntradasComponent implements OnInit {

  @Input() concierto: any;

  usuario: any = {};

  precioNormal: number = 0;
  precioVIP: number = 0;

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
    idConcierto: 0,
    idUsuario: 0,
    fecha_crt: new Date(),
    idTransaccion: ""
  }
  getAsineto: any = [];


  total: number = 0;

  constructor(
    private asientosService: AsientosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private compradoService: NgbModal
    ) { }

  ngOnInit(): void {
    this.listarAsientos();
    this.initConfig();
    this.getToken();
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

        this.crearAsiento(data.id);
        this.abrirComprado(
          this.asientosSeleccionados,
          data.purchase_units[0].amount.value,
          this.precioVIP,
          this.precioNormal,
          this.concierto.titulo,
          this.concierto.fecha,
          this.usuario.id,
          data.id
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
  seleccionarAsiento(fila: number, letra: string, event: any) { //selecciona asientos para comprar

    let seat : HTMLElement = event.path[0] as HTMLElement; //cambia la clase a active para ver el asiento seleccionado
    if (seat.classList.contains('active')){
      seat.classList.remove('active');
    }else {
      seat.classList.add('active');
    }

    this.precioVIP = this.concierto.precioVip; //se fijan los precios desde el concierto
    this.precioNormal = this.concierto.precioNormal;

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

  crearAsiento(idTransaccion: any) {//Añadir asientos comprados a la base de datos
    const params = this.activatedRoute.snapshot.params['id'];
    delete this.asiento.id;
    delete this.asiento.fecha_crt;

    for (let i of this.asientosSeleccionados) {
      this.asiento.fila = i.fila;
      this.asiento.letra = i.letra;
      this.asiento.idConcierto = Number(params);
      this.asiento.idUsuario = this.usuario.id;
      this.asiento.idTransaccion = idTransaccion;

      this.asientosService.crearAsiento(this.asiento)
        .subscribe(
          res => {
            console.log(res);
          },
          err => console.log(err)
        );

    }

  }

  getToken() {
    let token: string | any = localStorage.getItem('token');
    let decodeId = jwt_decode(token);
    this.usuario = decodeId;
  }


  comprar():void {
    if(this.asientosSeleccionados.length > 0){
      this.pagar = !this.pagar;
    }
  }

  //abre componente en una ventana emergente
  abrirComprado(
    items: any,
    total: any,
    precioVIP: any,
    precioNormal: any,
    nombre: any,
    fecha: any,
    idUsuario: any,
    idCompra: any,
    ): void {
    const modalRef = this.compradoService.open(CompradoComponent);
    modalRef.componentInstance.items = items;
    modalRef.componentInstance.total = total;
    modalRef.componentInstance.precioVIP = precioVIP;
    modalRef.componentInstance.precioNormal = precioNormal;
    modalRef.componentInstance.nombre = nombre;
    modalRef.componentInstance.fecha = fecha;
    modalRef.componentInstance.idUsuario = idUsuario;
    modalRef.componentInstance.idCompra = idCompra;
  }

}

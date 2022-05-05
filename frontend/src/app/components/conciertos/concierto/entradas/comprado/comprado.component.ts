import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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


  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  reload(): void {
    location.reload();
  }

}

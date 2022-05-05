import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-condiciones',
  templateUrl: './condiciones.component.html',
  styleUrls: ['./condiciones.component.scss']
})
export class CondicionesComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}

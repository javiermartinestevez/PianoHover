import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-privacidad',
  templateUrl: './privacidad.component.html',
  styleUrls: ['./privacidad.component.scss']
})
export class PrivacidadComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

}

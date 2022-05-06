import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CondicionesComponent } from '../terminos/condiciones/condiciones.component';
import { LegalComponent } from '../terminos/legal/legal.component';
import { PrivacidadComponent } from '../terminos/privacidad/privacidad.component';
import { TerminosComponent } from '../terminos/terminos.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(private terminosService: NgbModal) { }

  ngOnInit(): void {
  }


  //abre componente en una ventana emergente con los terminos
  abrirTerminos(): void {
    this.terminosService.open(TerminosComponent);
  }
  abrirLegal(): void {
    this.terminosService.open(LegalComponent);
  }
  abrirPrivacidad(): void {
    this.terminosService.open(PrivacidadComponent);
  }
  abrirCondiciones(): void {
    this.terminosService.open(CondicionesComponent);
  }

}

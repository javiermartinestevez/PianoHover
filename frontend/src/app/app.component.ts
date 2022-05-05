import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CondicionesComponent } from './components/terminos/condiciones/condiciones.component';
import { LegalComponent } from './components/terminos/legal/legal.component';
import { PrivacidadComponent } from './components/terminos/privacidad/privacidad.component';
import { TerminosComponent } from './components/terminos/terminos.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'PianoHover';

  constructor(
    private terminosService: NgbModal
    ) { }

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

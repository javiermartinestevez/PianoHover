import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { Usuario } from 'src/models/Usuario';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
@Input() params: any;


  usuario: Usuario | any = {
    nombre: ''
  };

  id: any;
  constructor(private activatedRoute: ActivatedRoute, private usuariosService: UsersService) { }

  ngOnInit(): void {
    this.getId();
    this.consulta();
  }
  getId(){
    let token: any = localStorage.getItem('token');
    let decodeToeken = jwt_decode(token)
    let usuarioToken: any = decodeToeken;
    this.id = usuarioToken.id;
  }

  consulta(): void { //datos del usuario
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]){
      this.usuariosService.getUsuario(params["id"])
        .subscribe(
          res => {
            this.usuario = res;
          },
          err => console.error(err)
        )
    }
  }

  historial: boolean = false;
  editar: boolean = false;
  abrirComponente(event: any) {
    let componente : HTMLElement = event.path[0] as HTMLElement;
    componente.classList.add('active');
    console.log("???: ",event.srcElement.nextSibling)
    ;

    if(componente.id === "historial"){
      this.historial = true;
      this.editar = false;
    }else {
      this.historial = false;
      this.editar = true;
    }
  }
}

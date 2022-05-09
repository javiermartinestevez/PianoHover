import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private usuariosService: UsersService) { }

  ngOnInit(): void {
    this.consulta();
  }

  consulta(): void {
    const params = this.activatedRoute.snapshot.params;
    if (params["id"]){
      this.usuariosService.getUsuario(params["id"])
        .subscribe(
          res => {
            console.log(res);
          },
          err => console.error(err)
        )
    }
  }

}

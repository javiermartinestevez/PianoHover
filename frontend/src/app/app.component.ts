import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'PianoHover';
  token: any = {};

  constructor() { }

    ngOnInit(): void {
      this.isLoged();
    }

    isLoged() {
      let user = localStorage.getItem('token');
      if(user){
        this.getToken();
        this.exp();
      }
    }

    getToken() {
      let token: string | any = localStorage.getItem('token');
      let decodeId = jwt_decode(token);
      this.token = decodeId;
    }

    exp() {//exipirar token si ha pasado media hora
      let dateStamp = Math.floor((new Date).getTime() / 1000);
      if (this.token.exp < dateStamp) {
        localStorage.removeItem('token');
      }
    }

}

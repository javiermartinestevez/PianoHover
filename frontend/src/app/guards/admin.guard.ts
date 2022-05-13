import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  usuario: any = {};

  constructor(private router: Router){}

  decode(token: string | any) {
    let decodeId = jwt_decode(token);
    this.usuario = decodeId;
    return this.usuario;
  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const token = localStorage.getItem('token');

      if(this.decode(token).rol === 1){
        return true;
      }else {
        return false;
      }

  }

}

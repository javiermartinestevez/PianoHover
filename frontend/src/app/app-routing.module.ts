import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConciertosComponent } from './components/conciertos/conciertos.component';
import { HomeComponent } from './components/home/home.component';
import { ConciertosFormComponent } from './components/conciertos-form/conciertos-form.component';
import { ConciertoComponent } from './components/conciertos/concierto/concierto.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { LoginGuard } from './guards/login.guard';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AdminGuard } from './guards/admin.guard';
import { EditarComponent } from './components/perfil/editar/editar.component';
import { HistorialComponent } from './components/perfil/historial/historial.component';
import { ListaUsuariosComponent } from './components/administrador/lista-usuarios/lista-usuarios.component';
import { UsuarioAdminComponent } from './components/administrador/lista-usuarios/usuario-admin/usuario-admin.component';
import { ListaConciertosComponent } from './components/administrador/lista-conciertos/lista-conciertos.component';

const routes: Routes = [

  { path: "", component: HomeComponent, pathMatch: "full" },

  { path: "conciertos", component: ConciertosComponent, canActivate: [LoginGuard]},
  { path: "conciertos/add", component: ConciertosFormComponent, canActivate: [AdminGuard] },
  { path: "conciertos/edit/:id", component: ConciertosFormComponent, canActivate: [AdminGuard] },
  { path: "concierto/:id", component: ConciertoComponent },

  { path: "perfil/:id", component: PerfilComponent, canActivate: [LoginGuard] },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "perfil/:id/editarPerfil", component: EditarComponent, canActivate: [LoginGuard] },
  { path: "perfil/:id/historial", component: HistorialComponent, canActivate: [LoginGuard] },

  { path: "administrador", component: AdministradorComponent, canActivate: [AdminGuard] },
  { path: "administrador/lista-usuarios", component: ListaUsuariosComponent, canActivate: [AdminGuard] },
  { path: "administrador/lista-usuarios/:id", component: UsuarioAdminComponent, canActivate: [AdminGuard] },
  { path: "administrador/lista-conciertos", component: ListaConciertosComponent, canActivate: [AdminGuard] },

  { path: "**", component: HomeComponent, pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

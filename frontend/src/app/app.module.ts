import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ConciertosComponent } from './components/conciertos/conciertos.component';

import { ConciertosService } from './services/conciertos.service';
import { HttpClientModule } from '@angular/common/http';
import { ConciertosFormComponent } from './components/conciertos-form/conciertos-form.component';
import { FormsModule } from '@angular/forms';
import { ConciertoComponent } from './components/conciertos/concierto/concierto.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { EntradasComponent } from './components/conciertos/concierto/entradas/entradas.component';

//Paypal

import { NgxPayPalModule } from 'ngx-paypal';
import { CompradoComponent } from './components/conciertos/concierto/entradas/comprado/comprado.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TerminosComponent } from './components/terminos/terminos.component';
import { PrivacidadComponent } from './components/terminos/privacidad/privacidad.component';
import { LegalComponent } from './components/terminos/legal/legal.component';
import { CondicionesComponent } from './components/terminos/condiciones/condiciones.component';
import { AdministradorComponent } from './components/administrador/administrador.component';
import { LoginErrorComponent } from './components/error/login-error/login-error.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { EditarComponent } from './components/perfil/editar/editar.component';
import { HistorialComponent } from './components/perfil/historial/historial.component';
import { SidebarComponent } from './components/perfil/sidebar/sidebar.component';
import { ListaUsuariosComponent } from './components/administrador/lista-usuarios/lista-usuarios.component';
import { SidebarAdminComponent } from './components/administrador/sidebar-admin/sidebar-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { DialogoEliminarComponent } from './components/dialogo-eliminar/dialogo-eliminar.component';
import { UsuarioAdminComponent } from './components/administrador/lista-usuarios/usuario-admin/usuario-admin.component';
import { ListaConciertosComponent } from './components/administrador/lista-conciertos/lista-conciertos.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConciertosComponent,
    ConciertosFormComponent,
    ConciertoComponent,
    LoginComponent,
    RegisterComponent,
    EntradasComponent,
    CompradoComponent,
    TerminosComponent,
    PrivacidadComponent,
    LegalComponent,
    CondicionesComponent,
    AdministradorComponent,
    LoginErrorComponent,
    HeaderComponent,
    FooterComponent,
    PerfilComponent,
    EditarComponent,
    HistorialComponent,
    SidebarComponent,
    ListaUsuariosComponent,
    SidebarAdminComponent,
    DialogoEliminarComponent,
    UsuarioAdminComponent,
    ListaConciertosComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPayPalModule,
    NgbModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    DialogoEliminarComponent
  ],
  providers: [
    ConciertosService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

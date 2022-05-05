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
    CondicionesComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPayPalModule,
    NgbModule,
  ],
  providers: [
    ConciertosService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

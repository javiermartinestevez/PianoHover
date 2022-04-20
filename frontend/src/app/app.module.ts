import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ConciertosComponent,
    ConciertosFormComponent,
    ConciertoComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    ConciertosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

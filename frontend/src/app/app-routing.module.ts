import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConciertosComponent } from './components/conciertos/conciertos.component';
import { HomeComponent } from './components/home/home.component';
import { ConciertosFormComponent } from './components/conciertos-form/conciertos-form.component';
import { ConciertoComponent } from './components/conciertos/concierto/concierto.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [

  { path: "", component: HomeComponent, pathMatch: "full" },
  { path: "conciertos", component: ConciertosComponent },
  { path: "conciertos/add", component: ConciertosFormComponent },
  { path: "conciertos/edit/:id", component: ConciertosFormComponent },
  { path: "concierto/:id", component: ConciertoComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "**", component: HomeComponent, pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CotizadorComponent } from './cotizador/cotizador.component';
import { FooterComponent } from './footer/footer.component';
import { Navbar2Component } from './navbar2/navbar2.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CotizacionesComponent } from './cotizaciones/cotizaciones.component';
import { ProcesopagoComponent } from './procesopago/procesopago.component';
import { AppRoutingModule } from './app-routing.module';
import { ModalsComponent } from './modals/modals.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    CotizadorComponent,
    FooterComponent,
    Navbar2Component,
    NavbarComponent,
    CotizacionesComponent,
    ProcesopagoComponent,
    ModalsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

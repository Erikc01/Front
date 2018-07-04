import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Meta, Title } from "@angular/platform-browser";
import {Api} from "../api.constants";

import { Location } from '@angular/common';
import { Router } from '@angular/router';
import Swiper from 'swiper';
import * as $ from 'jquery';

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {
  tipo_flujo = Api.TIPO_FLUJO; //Distinguir si es el caso A o B de las cotizaciones
  /** Valores para caso A **/
  idActive= 1000;

  id_quote:any;
  id:any;
  year : any ;
  maker : any ;
  url_foto: any;
  model: any;
  model_first :string="";
  version: any;
  zip_code: any;
  birth_date: any;
  gender: any;
  email: any;
  cellphone: any;
  packages: any;
  cotizacion: any;
  token: any;
  fecha_vig_cotizacion: any;
  fecha_boolean:any;
  precio_km: any;
  precio_km_selected:any;
  //Plan seleccionado
  package_select: any;
  vigency_select: any;
  precio_select: any;


  constructor(private router : Router, private http: HttpClient, meta: Meta, title: Title) { 
    title.setTitle('Cotizaciones de seguro de auto por kilometro - Seguro por kilometro');
    meta.addTags([
      {name: 'author',   content: 'Seguro por kilometro - sxkm.mx seguro.sxkm-mx'},
      { name: 'keywords', content: 'seguro de auto, sxkm, seguro por kilometro, seguro de auto por kilómetro, seguro de auto por kilometro, seguro de auto, cotiza seguro de auto por kilometro, cotizar seguro de auto, seguros de autos por kilometros, aig, seguros aig, seguros de auto aig, cotizar seguros de autos por kilometros, seguro de auto cdmx, seguro de auto en mexico, kilometro, seguros de autos, aig sxkm, seguro de auto economico'},
      { name: 'description', content: 'Ahorra en tu seguro de auto pagando por kilometro. Protege tu auto con todos los beneficios de un seguro de cobertura amplia y el respaldo de AIG.' }
    ]);
  }
  ngOnInit() {
    var url_string = this.router.url ;
    var splitted = url_string.split("/");
    this.id_quote = splitted[2];
    this.get_quotation();
    var mySwiper = new Swiper ('#swipe-container1', {
      slidesPerView: 1,
      // Optional parameters
      direction: 'horizontal',
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      autoplay: {
        delay: 3000,
      },
    });
  }

  get_quotation(){
    this.http.get(Api.API_DOMAIN+'api/v1/web_services/get_quotation?quote_id='+this.id_quote).subscribe(
      data => {
        this.cotizacion = data;
        this.year=this.cotizacion.aig.year;
        this.maker=this.cotizacion.aig.maker;
        this.url_foto= "/assets/img/makers/"+this.cotizacion.aig.maker+".png";
        this.model=this.cotizacion.aig.model;
        this.version=this.cotizacion.aig.version;
        this.zip_code=this.cotizacion.quote.zipcode_id;
        this.precio_km = this.cotizacion.quote.cost_by_km.toFixed(2);

        var fecha_hoy = new Date();
        var fecha_vig_cot = new Date(this.cotizacion.fecha_vigencia);

        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        this.fecha_vig_cotizacion = fecha_vig_cot.toLocaleDateString("es-ES", options)
        if(fecha_vig_cot >= fecha_hoy)
          this.fecha_boolean=true;
        else  this.fecha_boolean=false;
        this.packages=this.cotizacion.cotizaciones;

        this.packages.forEach( item => {
          if(item.package==250){
            this.precio_km = item.cost_by_package;
            this.package_select = item.package;
            this.vigency_select = item.vigency;
            this.precio_select  = item.cost_by_package;
          }
          if(this.precio_km > item.cost_by_km)
            this.precio_km = item.cost_by_km;
        });
      },
      error => console.log(error)  // error path
    );
  }
  cambiarPlan(id){
    this.packages.forEach( item => {
      if(item.package==id){
        this.package_select=item.package;
        this.vigency_select=item.vigency;
        this.precio_select=item.cost_by_package;
      }
    });
  }

  cambiarActivo(id){
    this.idActive = id;
  }
}
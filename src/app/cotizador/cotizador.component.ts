import { Component, OnInit , Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient} from "@angular/common/http";
import { HttpHeaders } from '@angular/common/http';
import { Api} from "../api.constants";
import { FormBuilder,FormGroup,FormControl,Validators,NgForm} from '@angular/forms';
import { Meta, Title } from "@angular/platform-browser";
import { Location } from '@angular/common';
import { Router } from '@angular/router';
//import { HostListener } from '@angular/core'
declare var $:any;


@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent implements OnInit {
  //Bandera
  bandera: any = 1; // homepage
  buscar_modelos: any = false;
  buscar_versiones: any = false;
  dispositivo: any = "desktop";

  //Formulario
  all_makers:       any = Array();
  all_makers_principales:       any = Array();
  all_years:        any = Array();
  all_models:       any = Array();
  all_versions:     any = Array();
  all_days_birth:   any = Array();
  all_months_birth: any = Array();
  all_years_birth:  any = Array();
  input_check1:     any = false;
  input_check2:     any = false;
  input_check3:     any = false;

  //Cotizador desktop
  disable_makers:   any = false;
  disable_models:   any = true;
  disable_versions: any = true;
  //Cotizador mobile

  //Errores del formulario
  error_maker:       any = "";
  error_year:        any = "";
  error_model:       any = "";
  error_version:     any = "";
  error_zipcode:     any = "";
  error_day_birth:   any = "";
  error_month_birth: any = "";
  error_year_birth:  any = "";
  error_email:       any = "";
  error_cellphone:   any = "";
  error_checkbox1:   any = "";
  error_checkbox2:   any = "";
  error_checkbox3:   any = "";


  //Paso del cotizador
  paso: any = 1;


  //Datos para enviar a cotizador
  maker:        any = "";
  year:         any = "";
  model:        any = "";
  version:      any = "";
  sisa:         any = "";
  maker_name:   any = "";
  model_name:   any = "";
  version_name: any = "";
  day_birth:    any = "";
  month_birth:  any = "";
  year_birth:   any = "";
  birth_date:   any = "";
  zipcode:      any = "";
  gender:       any = 2;
  email:        any = "";
  cellphone:    any = "";

  //respuesta de la cotizacion
  cotizacion:   any;
  tiempo:       any = 2;

  //HUBSPOT
  vid_parent:any = "";
  vid:       any = "";
  visitas:   any = 1;
  form:      any = Array();

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private http: HttpClient,private router : Router, private frmbuilder:FormBuilder,private meta: Meta,private title: Title) {
    this.get_makers();
  }

  ngOnInit() {
    var url_string = this.router.url ;
    if(url_string==Api.COTIZADOR_V2){
      this.bandera=2;
    }
    this.get_years();
    this.get_days_birth();
    this.get_months_birth();
    this.get_years_birth();
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem("vid");
      //localStorage.removeItem("access_token");
      if(!localStorage.getItem("access_token"))
        this.refresh_token_hubspot();
      else
        this.validar_token_hubspot();
    }
  }
  get_makers() {
    /**
    this.http.get(Api.DEVELOPMENT_DOMAIN+'makers/').subscribe(
      data => {
        this.all_makers = data;
        this.disable_makers = false;
      },
      error => {
        console.log(error)  // error path
      }
    );**/
    this.all_makers = [
      {"id":"167","name":"ACURA", "posx" : "0px", "posy":"0px"},
      {"id":"1","name":"ALFA", "posx" : "-150px", "posy":"0px"},
      {"id":"2","name":"AUDI", "posx" : "-300px", "posy":"0px"},
      {"id":"5","name":"BMW", "posx" : "-450px", "posy":"0px"},
      {"id":"8","name":"BUICK", "posx" : "-600px", "posy":"0px"},
      {"id":"9","name":"CADILLAC", "posx" : "-750px", "posy":"0px"},
      {"id":"17","name":"CHEVROLET", "posx" : "0px", "posy":"-150px"},
      {"id":"18","name":"CHRYSLER", "posx" : "-150px", "posy":"-150px"},
      {"id":"21","name":"DATSUN", "posx" : "-300px", "posy":"-150px"},
      {"id":"24","name":"DODGE", "posx" : "-450px", "posy":"-150px"},
      {"id":"150","name":"FIAT", "posx" : "-600px", "posy":"-150px"},
      {"id":"29","name":"FORD", "posx" : "-750px", "posy":"-150px"},
      {"id":"204","name":"GM", "posx" : "0px", "posy":"-300px"},
      {"id":"32","name":"GMC", "posx" : "-150px", "posy":"-300px"},
      {"id":"36","name":"HONDA", "posx" : "-300px", "posy":"-300px"},
      {"id":"183","name":"HUMMER", "posx" : "-450px", "posy":"-300px"},
      {"id":"37","name":"HYUNDAI", "posx" : "-600px", "posy":"-300px"},
      {"id":"284","name":"INFINITI", "posx" : "-750px", "posy":"-300px"},
      {"id":"43","name":"JAGUAR", "posx" : "0px", "posy":"-450px"},
      {"id":"46","name":"JEEP", "posx" : "-150px", "posy":"-450px"},
      {"id":"157","name":"KIA", "posx" : "-300px", "posy":"-450px"},
      {"id":"53","name":"LAND ROVER", "posx" : "-450px", "posy":"-450px"},
      {"id":"185","name":"LINCOLN", "posx" : "-600px", "posy":"-450px"},
      {"id":"56","name":"MAZDA", "posx" : "-750px", "posy":"-450px"},
      {"id":"58","name":"MERCEDES", "posx" : "0px", "posy":"-600px"},
      {"id":"59","name":"MERCURY", "posx" : "-150px", "posy":"-600px"},
      {"id":"61","name":"MITSUBISHI", "posx" : "-300px", "posy":"-600px"},
      {"id":"63","name":"NISSAN", "posx" : "-450px", "posy":"-600px"},
      {"id":"70","name":"PEUGEOT", "posx" : "-600px", "posy":"-600px"},
      {"id":"76","name":"PONTIAC", "posx" : "-750px", "posy":"-600px"},
      {"id":"77","name":"PORSCHE", "posx" : "0px", "posy":"-750px"},
      {"id":"82","name":"RENAULT", "posx" : "-150px", "posy":"-750px"},
      {"id":"128","name":"SAAB", "posx" : "-300px", "posy":"-750px"},
      {"id":"124","name":"SEAT", "posx" : "-450px", "posy":"-750px"},
      {"id":"208","name":"SMART", "posx" : "-600px", "posy":"-750px"},
      {"id":"168","name":"SUBARU", "posx" : "-750px", "posy":"-750px"},
      {"id":"87","name":"SUZUKI", "posx" : "0px", "posy":"-900px"},
      {"id":"91","name":"TOYOTA", "posx" : "-150px", "posy":"-900px"},
      {"id":"95","name":"VOLKSWAGEN", "posx" : "-300px", "posy":"-900px"},
      {"id":"97","name":"VOLVO", "posx" : "-450px", "posy":"-900px"}
    ];
    this.all_makers_principales = [
      {"id":"5","name":"BMW", "posx" : "-450px", "posy":"0px"},
      {"id":"95","name":"VOLKSWAGEN", "posx" : "-300px", "posy":"-900px"},
      {"id":"58","name":"MERCEDES", "posx" : "0px", "posy":"-600px"},
      {"id":"29","name":"FORD", "posx" : "-750px", "posy":"-150px"},
      {"id":"63","name":"NISSAN", "posx" : "-450px", "posy":"-600px"},
      {"id":"17","name":"CHEVROLET", "posx" : "0px", "posy":"-150px"},
      {"id":"36","name":"HONDA", "posx" : "-300px", "posy":"-300px"},
      {"id":"2","name":"AUDI", "posx" : "-300px", "posy":"0px"},
      {"id":"124","name":"SEAT", "posx" : "-450px", "posy":"-750px"},
      {"id":"91","name":"TOYOTA", "posx" : "-150px", "posy":"-900px"}
    ];
  }
  get_years() {
    var date = new Date();
    var year = date.getFullYear()+1;
    for(var i = year; i>=(year-16);i--){
      this.all_years.push(i);
    }
  }
  get_models() {
    this.clean_maker();
    this.clean_year();
    this.clean_models();
    this.clean_versions();
    if(this.maker!="" && this.year!=""){
      this.buscar_modelos = true;
      this.http.get(Api.DEVELOPMENT_DOMAIN+'models?year='+this.year+'&maker='+this.maker).subscribe(
          (data:any) => {
            this.all_models = data;
            this.all_models = data;
            if(data==null){
              this.clean_models();
              this.clean_versions();
            } else this.disable_models = false;
            this.set_maker();
            this.buscar_modelos = false;
          },
          (error:any) => {
            console.log(error)
            this.buscar_modelos = false;  // error path
            this.clean_maker();
            this.clean_year();
            this.clean_models();
            this.clean_versions();
          }
      );
    }
  }
  get_versions(){
    this.clean_versions();
    this.buscar_versiones = true;
    this.http.get(Api.DEVELOPMENT_DOMAIN+'model_versions?year='+this.year+'&maker='+this.maker+'&model='+this.model+'').subscribe(
      data => {
        this.all_versions = data;
        this.buscar_versiones = false;
        if(this.all_versions=='') this.all_versions=null;
        if(this.all_versions!=null || this.all_versions!="") this.disable_versions = false;
      },
      error => {
        console.log(error); // error path
        this.buscar_versiones = false;
      }
    );
  }
  get_days_birth(){
    for(var i = 1; i<=31;i++){
      if(i<10)
        this.all_days_birth.push("0"+i);
      else this.all_days_birth.push(i);
    }
  }
  get_months_birth(){
    for(var i = 1; i<=12;i++){
      if(i<10)
        this.all_months_birth.push("0"+i);
      else this.all_months_birth.push(i);
    }
  }
  get_years_birth() {
    var date = new Date();
    var year = date.getFullYear()-21;
    for(var i = year; i>=(year-70);i--){
      this.all_years_birth.push(i);
    }
  }
  get_sisa(){
    this.sisa = "";
    this.http.get(Api.DEVELOPMENT_DOMAIN+'version_id?year='+this.year+'&maker='+this.maker+'&model='+this.version).subscribe(
      data => {
        this.sisa = data;
      },
      error => {
        console.log(error)  // error path
      }
    );
  }

  set_maker(){
    this.maker_name = "";
    for (let maker of this.all_makers) {
      if(this.maker==maker.id)
        this.maker_name = maker.name;
    }
  }
  set_model(){
    this.model_name = "";
    for (let model of this.all_models) {
      if(this.model==model.id)
        this.model_name = model.name;
    }
  }
  set_version(){
    this.version_name = "";
    for (let version of this.all_versions) {
      if(this.version==version.id){
        this.version_name = version.name;
        this.get_sisa();
      }
    }
  }
  set_gender(gender){
    this.gender = gender
  }
  set_check(input){
    if(input==1){
      if(this.input_check1==false){
        this.input_check1=true;
        this.error_checkbox1 = "";
      }
      else this.input_check1=false;
    }
    if(input==2){
      if(this.input_check2==false){
        this.input_check2=true;
        this.error_checkbox2 = "";
      }
      else this.input_check2=false;
    }
    if(input==3){
      if(this.input_check3==false){
        this.input_check3=true;
        this.error_checkbox3 = "";
      }
      else this.input_check3=false;
    }
  }
  clean_maker(){
    this.error_maker = "";
  }
  clean_year(){
    this.error_year = "";
  }
  clean_models(){
    this.all_models = Array();
    this.model = "";
    this.disable_models = true;
    this.error_model="";
  }
  clean_versions(){
    this.all_versions = Array();
    this.version = "";
    this.error_version="";
    this.disable_versions = true;
  }

  continuar_desktop(paso, form){
    this.dispositivo = "desktop";
    var siguiente = true;
    if(paso==2){
      if(this.version==""){
        siguiente=false;
        this.error_version="invalid border-danger";
        document.getElementById("version").focus();
      }
      else{
        this.error_version="";
        this.set_version();
      }
      if(this.model==""){
        siguiente=false;
        this.error_model="invalid border-danger";
        document.getElementById("model").focus();
      }
      else{
        this.error_model="";
      }
      if(this.year==""){
        siguiente=false;
        this.error_year="invalid border-danger";
        document.getElementById("year").focus();
      }
      else{
        this.error_year="";
      }
      if(this.maker==""){
        siguiente=false;
        this.error_maker="invalid border-danger";
        document.getElementById("maker").focus();
      }
      else{
        this.error_maker="";
      }
    }
    if(paso==3){
      if(this.input_check3==false){
        siguiente=false;
        this.error_checkbox3="invalid border-danger";
      }
      else this.error_checkbox3 = "";
      if(this.input_check2==false){
        siguiente=false;
        this.error_checkbox2="invalid border-danger";
      }
      else this.error_checkbox2 = "";
      if(this.input_check1==false){
        siguiente=false;
        this.error_checkbox1="invalid border-danger";
      }
      else this.error_checkbox1 = "";
      if(this.cellphone==""){
        siguiente=false;
        this.error_cellphone="invalid border-danger";
        document.getElementById("cellphone").focus();
      }
      else{
        if(this.cellphone.length<10){
          siguiente=false;
          this.error_cellphone="invalid border-danger";
          document.getElementById("cellphone").focus();
        }
        else this.error_cellphone = "";
      }
      if(this.email==""){
        siguiente=false;
        this.error_email="invalid border-danger";
        document.getElementById("email").focus();
      }
      else{
        //validar si es correo
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        var serchfind = regexp.test(this.email);
        //console.log(serchfind);
        if(!serchfind){
          siguiente=false;
          this.error_email="invalid border-danger";
          document.getElementById("email").focus();
        }
        else this.error_email = "";
      }
       if(this.year_birth==""){
        siguiente=false;
        this.error_year_birth="invalid border-danger";
        document.getElementById("year_birth").focus();
      }
      else{
        //console.log("fecha");
        let fecha_original = this.year_birth+"-"+this.month_birth+"-"+this.day_birth;
        let fecha = new Date(this.year_birth,(this.month_birth-1),this.day_birth);
        //console.log(fecha);
        let day:string = "";
        let month = "";
        if(fecha.getDate() < 10)
          day = "0"+fecha.getDate();
        else
          day = ""+fecha.getDate();

        if(fecha.getMonth() < 9)
          month = "0"+(fecha.getMonth()+1);
        else
          month = ""+(fecha.getMonth()+1);

        let fecha_nueva = fecha.getFullYear()+"-"+month+"-"+day;
        //console.log("Fecha original: "+fecha_original);
        //console.log("Fecha nueva: "+fecha_nueva);
        if(fecha_original!=fecha_nueva){
          siguiente = false;
          this.error_day_birth = "invalid border-danger";
          this.error_month_birth = "invalid border-danger";
          this.error_year_birth = "invalid border-danger";
          document.getElementById("day_birth").focus();
        }
        else this.error_year_birth = "";
      }
      if(this.month_birth==""){
        siguiente=false;
        this.error_month_birth="invalid border-danger";
        document.getElementById("month_birth").focus();
      }
      else this.error_month_birth = "";
      if(this.day_birth==""){
        siguiente=false;
        this.error_day_birth="invalid border-danger";
        document.getElementById("day_birth").focus();
      }
      else this.error_day_birth = "";
      if(this.zipcode==""){
        siguiente=false;
        this.error_zipcode="invalid border-danger";
        document.getElementById("zipcode").focus();
      }
      else{
        this.http.get(Api.API_DOMAIN_ZIPCODES+"autocomplete_zipcode?term="+this.zipcode).subscribe(
          (data:any) => {
            console.log(data.status);
            if(data.status==1){
              this.error_zipcode = "";
            }
            else{
              siguiente=false;
              this.error_zipcode="invalid border-danger";
              document.getElementById("zipcode").focus();
            }
          },
          (error:any) => {
            siguiente=false;
            this.error_zipcode="invalid border-danger";
            document.getElementById("zipcode").focus();
          }
        );
      }

    }
    if(siguiente){
      this.paso = paso;
      if(this.paso==3){
        this.tiempo = 1;
        $("#idModalCotizando").modal("show");
        setInterval(()=>{
          if(this.tiempo<96)
            this.tiempo+=5;
          else this.tiempo = 96;
            //console.log(this.tiempo);
        }, 4000);
        this.send_quotation();
      }
    }
  }
  continuar_mobile(paso,id){
    this.dispositivo = "mobile";
    var siguiente = true;
    if(paso==2){
      this.maker = id;
      this.set_maker();
      this.get_models();
    }
    if(paso==3){
      this.year = id;
      this.get_models();
    }
    if(paso==4){
      this.model = id;
      this.get_versions();
    }
    if(paso==5){
      this.version = id;
      this.set_version();
    }
    if(paso==6){
      if(this.input_check3==false){
        siguiente=false;
        this.error_checkbox3="invalid border-danger";
      }
      else this.error_checkbox3 = "";
      if(this.input_check2==false){
        siguiente=false;
        this.error_checkbox2="invalid border-danger";
      }
      else this.error_checkbox2 = "";
      if(this.input_check1==false){
        siguiente=false;
        this.error_checkbox1="invalid border-danger";
      }
      else this.error_checkbox1 = "";
      if(this.cellphone==""){
        siguiente=false;
        this.error_cellphone="invalid border-danger";
        document.getElementById("cellphone").focus();
      }
      else{
        if(this.cellphone.length<10){
          siguiente=false;
          this.error_cellphone="invalid border-danger";
          document.getElementById("cellphone").focus();
        }
        else this.error_cellphone = "";
      }
      if(this.email==""){
        siguiente=false;
        this.error_email="invalid border-danger";
        document.getElementById("email").focus();
      }
      else{
        //validar si es correo
        var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        var serchfind = regexp.test(this.email);
        //console.log(serchfind);
        if(!serchfind){
          siguiente=false;
          this.error_email="invalid border-danger";
          document.getElementById("email").focus();
        }
        else this.error_email = "";
      }
      if(this.year_birth==""){
        siguiente=false;
        this.error_year_birth="invalid border-danger";
        document.getElementById("year_birth").focus();
      }
      else{
        let fecha_original = this.year_birth+"-"+this.month_birth+"-"+this.day_birth;
        let fecha = new Date(this.year_birth,(this.month_birth-1),this.day_birth);
        //console.log(fecha);
        let day:string = "";
        let month = "";
        if(fecha.getDate() < 10)
          day = "0"+fecha.getDate();
        else
          day = ""+fecha.getDate();

        if(fecha.getMonth() < 10)
          month = "0"+(fecha.getMonth()+1);
        else
          month = ""+(fecha.getMonth()+1);

        let fecha_nueva = fecha.getFullYear()+"-"+month+"-"+day;
        //console.log("Fecha original: "+fecha_original);
        //console.log("Fecha nueva: "+fecha_nueva);
        if(fecha_original!=fecha_nueva){
          siguiente = false;
          this.error_day_birth = "invalid border-danger";
          this.error_month_birth = "invalid border-danger";
          this.error_year_birth = "invalid border-danger";
          document.getElementById("day_birth").focus();
        }
        else this.error_year_birth = "";
      }
      if(this.month_birth==""){
        siguiente=false;
        this.error_month_birth="invalid border-danger";
        document.getElementById("month_birth").focus();
      }
      else this.error_month_birth = "";
      if(this.day_birth==""){
        siguiente=false;
        this.error_day_birth="invalid border-danger";
        document.getElementById("day_birth").focus();
      }
      else this.error_day_birth = "";
      if(this.zipcode==""){
        siguiente=false;
        this.error_zipcode="invalid border-danger";
        document.getElementById("zipcode").focus();
      }
      else{
        this.http.get(Api.API_DOMAIN_ZIPCODES+"autocomplete_zipcode?term="+this.zipcode).subscribe(
          (data:any) => {
            console.log(data.status);
            if(data.status==1){
              this.error_zipcode = "";
            }
            else{
              siguiente=false;
              this.error_zipcode="invalid border-danger";
              document.getElementById("zipcode").focus();
            }
          },
          (error:any) => {
            siguiente=false;
            this.error_zipcode="invalid border-danger";
            document.getElementById("zipcode").focus();
          }
        );
      }
    }
    //console.log(id);
    if(siguiente){
      this.paso = paso;
      let bar = (paso*16.67)+"%";
      $("#progress-bar").css("width",bar);
      if(this.paso!=5){
        $('body,html').stop(true,true).animate({
            scrollTop: 0
        },1000);
      }
      if(this.paso==6){
        this.send_quotation();
      }
    }
  }
  prev(form){
    $('body,html').stop(true,true).animate({
        scrollTop: 0
    },1000);
    if(form=='quotation_form2'){
      let paso = this.paso-1;
      let bar = (paso*16.67)+"%";
      $("#progress-bar").css("width",bar);
    }
    if(form=='quotation_form1' && this.paso == 2){
      this.input_check1 = false;
      this.input_check2 = false;
      this.input_check3 = false;
    }
    if(form=='quotation_form2' && this.paso > 4 ){
      this.input_check1 = false;
      this.input_check2 = false;
      this.input_check3 = false;
    }
    if(this.paso > 5 && form =='quotation_form2')
      this.paso = 5;
    else this.paso = this.paso-1;
  }
  send_quotation(){
    let form = {
      "maker"        : this.maker,
      "year"         : this.year,
      "model"        : this.model,
      "version"      : this.version,
      "sisa"         : this.sisa,
      "maker_name"   : this.maker_name,
      "version_name" : this.version_name,
      "birth_date"   : this.year_birth+"-"+this.month_birth+"-"+this.day_birth,
      "zipcode"      : this.zipcode,
      "gender"       : this.gender,
      "email"        : this.email,
      "cellphone"    : this.cellphone,
      "referred_code": localStorage.getItem("ref"),
      "promo_code"   : localStorage.getItem("promo_code")
    }
    //console.log(form);
    this.http.post(Api.API_DOMAIN+'api/v1/web_services/create_quote',form).subscribe(
      (data:any) => {
        localStorage.removeItem("vid");
        localStorage.removeItem("promo_code");
        localStorage.removeItem("ref");
        $("#idModalCotizando").modal("hide");
        this.cotizacion = data;
        this.router.navigate(["/costo-paquetes-kilometros/"+this.cotizacion.quote.id]);
      },
      (error:any) => {
        $("#idModlCotizando").modal("hide");
        if(this.bandera==2)
          this.paso= 7;
        else{
          $("#idModalCotizando").modal("hide");
          $("#idModalError2").modal("show");
        }
        console.log(error)  // error path
      }
    );
  }

  validarZipcode(zipcode){
    this.http.get("https://sxkm.mx/quotations/autocomplete_zipcode?term="+zipcode).subscribe(
      (data:any) => {
        //console.log(data.status);
        return data.status;
      },
      (error:any) => {
        console.log(error);
      }
    );
    return 0;
  }


  //HUBSPOT
  hubspot(){
      //Verificamos si hay sesion pendiente
      this.vid = localStorage.getItem("vid");
      //console.log("VID: "+this.vid);
      this.form = Array();
      let form = Array();

      //Datos para enviar a cotizador
      form.push(
          {
            "property": "origen_cotizacion",
            "value": "Nuevo flujo - seguro.sxkm.mx"
          }
        );
      form.push(
          {
            "property": "codigo_promocion",
            "value": localStorage.getItem("promo_code")
          }
        );
      form.push(
          {
            "property": "codigo_referencia",
            "value": localStorage.getItem("ref")
          }
        );
      if(this.dispositivo!=""){
        form.push(
          {
            "property": "dispositivo",
            "value": this.dispositivo
          }
        );
      }
      if(this.maker_name!=""){
        form.push(
          {
            "property": "marca_cotizador",
            "value": this.maker_name
          }
        );
      }
      if(this.year!=""){
        form.push(
          {
            "property": "ano_modelo",
            "value": this.year
          }
        );
      }
      if(this.version_name!=""){
        form.push(
          {
            "property": "tipo_version",
            "value": this.version_name
          }
        );
      }
      if(this.day_birth!="" && this.month_birth!="" && this.year_birth!=""){
        var date = new Date(this.year_birth+'-'+this.month_birth+'-'+this.day_birth);
        form.push(
          {
            "property": "fecha_nacimiento",
            "value": date.getTime()
          }
        );
      }
      if(this.zipcode!=""){
        form.push(
          {
            "property": "zip",
            "value": this.zipcode
          }
        );
      }
      if(this.gender!=""){
        let gender = "Hombre";
        if(this.gender==1)
          gender = "Mujer"
        form.push(
          {
            "property": "sexo",
            "value": gender
          }
        );
      }
      if(this.email!=""){
        form.push(
          {
            "property": "email",
            "value": this.email
          }
        );
      }
      if(this.cellphone!=""){
        form.push(
          {
            "property": "mobilephone",
            "value": this.cellphone
          }
        );
      }
      if(this.input_check1!=""){
        form.push(
          {
            "property": "auto_no_siniestros",
            "value": this.input_check1
          }
        );
      }
      if(this.input_check2!=""){
        form.push(
          {
            "property": "auto_no_lucro",
            "value": this.input_check2
          }
        );
      }
      if(this.input_check3!=""){
        form.push(
          {
            "property": "auto_no_uber",
            "value": this.input_check3
          }
        );
      }
      form.push(
        {
          "property": "vistas_cotizaciones",
          "value": 0
        }
      );
      this.form = {
        "properties"  : form,
        "access_token": localStorage.getItem("access_token"),
        "vid": this.vid
      }
      console.log(this.form);
      if(!this.vid){
        this.create_contact();
      }
      else{
        console.log("hay una sesion");
        this.update_contact_vid();
      }
  }
  validar_token_hubspot(){
    let token = localStorage.getItem("access_token");
    let url = Api.API_DOMAIN+"api/v1/web_services/hubspot_validate_token?access_token="+token;
    //console.log(token)
    this.http.get(url).subscribe(
      (data: any) => {
        if(data.token)
          localStorage.setItem("access_token",data.token);
        else this.refresh_token_hubspot();
      },
      (error: any) => {
        localStorage.removeItem("access_token");
        this.refresh_token_hubspot();
      }
    );
  }

  refresh_token_hubspot(){
    let url = Api.API_DOMAIN+"api/v1/web_services/hubspot_refresh_token";
    this.http.get(url).subscribe(
      (data: any) => {
        localStorage.setItem("access_token",data.access_token);
      },
      (error: any) => {
        console.log(error);
        localStorage.removeItem("access_token");
      }
    );
  }
  get_contact_email(){
    let url = Api.API_DOMAIN+"api/v1/web_services/hubspot_get_contact?email="+this.email+"&access_token="+localStorage.getItem("access_token");
    this.http.get(url).subscribe(
      (data: any) => {
        //console.log(data);
        this.vid_parent = data.vid
        this.merge_contacts();
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  create_contact(){
    let url = Api.API_DOMAIN+"api/v1/web_services/hubspot_create_contact";
    this.http.post(url,this.form).subscribe(
        (data: any) => {
        localStorage.setItem("vid",data.vid);
        //console.log(data);;
      },
      (error: any) => {
        console.log(error);
        if(error.error.error=='CONTACT_EXISTS'){
          this.get_contact_email();
        }
      }
    );
  }
  update_contact_vid(){
    let url = Api.API_DOMAIN+"api/v1/web_services/hubspot_update_contact";
    this.http.post(url,this.form).subscribe(
      (data: any) => {
        console.log("Estoy en update")
        //console.log(data);
        if(data!=null){
          if(data.error=='CONTACT_EXISTS')
            this.get_contact_email();
        }
      },
      (error: any) => {
        console.log("Estoy en error de update")
        console.log(error);
        //console.log(error.error.error);
        if(error.error.error=='CONTACT_EXISTS')
          this.get_contact_email();
      }
    );
  }
  merge_contacts(){
    console.log("Merge de contactos");
    let url = Api.API_DOMAIN+"api/v1/web_services/hubspot_merge_contact";
    let form = {
      "vid_parent": this.vid_parent,
      "vidToMerge": this.vid,
      "access_token": localStorage.getItem("access_token")
    }
    this.http.post(url,form).subscribe(
      (data: any) => {
          //console.log(data);;
      },
      (error: any) => {
        //console.log(error);
        if(error.status==200 && error.text=='SUCCESS'){
          this.vid = this.vid_parent;
          this.vid_parent = "";
        }
      }
    );
  }
}

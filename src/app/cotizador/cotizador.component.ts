import { Component, OnInit,AfterViewInit   } from '@angular/core';
import {HttpClient} from "@angular/common/http";
declare var jQuery:any;
declare var $ :any;
import {FormBuilder,FormGroup,FormControl,Validators,NgForm} from '@angular/forms'

@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.css']
})
export class CotizadorComponent implements OnInit {
  title = "Cotiza tu seguro x kilometro";
	tipo_flujo = 1; //Si es uno es caso A si es 2 es caso B
  bandera = 1; //Si es 1 significa que esta en el homepage si es 2 significa que es pagina nueva

  years : any ;
  all_makers: any;
  all_models: any;
  makers : any ;
  models: any;
  model_first :string="";
  versions: any;
  years_selected: any;
  maker_select: any;
  model_select: any;
  id_model_select: any;
  version_select: any;
  version_select_name: any;
  zip_code_select: any;
  birth_date_select: any;
  gender_select: any = "2";
  email_select: any;
  cellphone_select: any;
  quotationForm:FormGroup;
  cotizacion: any;

  paso: any = 1;

  constructor(private http: HttpClient, private frmbuilder:FormBuilder) {
    var url_string = window.location.href ;
    var url = location.href.split( '/' );
    console.log("La url es: "+url_string);
    if(url[3]=='cotizar-seguro-auto-por-kilometro')
      this.bandera=2;
    this.get_makers();
    this.get_years();
  }

  ngOnInit() {
     $(function () {
       var date = new Date();
       var yearStart = date.getFullYear() - 70;
       var yearEnd = date.getFullYear() - 21;
       var mes  = date.getMonth(); //Diferencia de menos 1
       var endDate = yearEnd+"-12-31";
       var startDate = yearStart+'-01-01';

      $('#fecha_nacimiento').datepicker({
         format: "yyyy-mm-dd",
          maxViewMode: 2,
          clearBtn: true,
          language: "es",
          todayHighlight: true,
          startDate: startDate,
          endDate: endDate,
          //datesDisabled: ['06-05-1993', '20-05-1993'],
          defaultViewDate: { year: yearEnd, month: mes, day: 25 }
      });
      $('#fecha_nacimiento_mobile').datepicker({
         format: "yyyy-mm-dd",
          maxViewMode: 2,
          clearBtn: true,
          language: "es",
          todayHighlight: true,
          startDate: startDate,
          endDate: endDate,
          //datesDisabled: ['06-05-1993', '20-05-1993'],
          defaultViewDate: { year: yearEnd, month: mes, day: 25 }
      });
      $("#fieldset5").hide();
    });
  }

    send_quotation(form){
      var angular_this = this;
      $("#"+form).validate({
        errorClass: "invalid border-danger",
        rules: {
          // simple rule, converted to {required:true}
          marca : "required",
          anio: "required",
          modelo: "required",
          version: "required",
          codigo_postal: {
            required: true,
            digits: true,
            minlength: 5
          },
          fecha_nacimiento: {
            required: true
          },
          correo: {
            required: true,
            email: true
          },
          checkbox_cotizador1:{
            required: true
          },
          checkbox_cotizador2:{
            required: true
          },
          checkbox_cotizador3:{
            required: true
          },
        },
        messages: {
          marca:{
            required: "Debes seleccionar la marca de tu vehículo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          },
          anio:{
            required: "Debes seleccionar el año de tu vehículo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          },
          modelo:{
            required: "Debes seleccionar el modelo de tu vehículo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          },
          version:{
            required: "Debes seleccionar la versión de tu vehículo &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          },
          codigo_postal:{
            required: "Debes ingresar tu código postal &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
            digits : "Código Postal inválido &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
            minlength: jQuery.validator.format("El código postal debe ser por lo menos de 5 dígitos &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
          },
          fecha_nacimiento:{
            required: "Debes seleccionar tu fecha de necimiento &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          },
          correo: {
            required: "Debes ingresar un correo eléctrónico &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
            email: "Correo inválido. Tu correo debe llevar un formato como ejemplo@correo.com &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
          },
          checkbox_cotizador1:{
            required: "Debes confirmar que el auto no es legalizado, fronterizo o de salvamento y no tiene siniestros por reclamar."
          },
          checkbox_cotizador2:{
            required: "Debes confirmar que el auto no es utilizado para fines de carga, comercio o lucro."
          },
          checkbox_cotizador3:{
            required: "Debes confirmar que el auto no es Uber o similares."
          }
        },
        submitHandler: function(form) {
          if(angular_this.bandera==2 && angular_this.paso>=5){
            angular_this.paso=6;
            $("#fieldset5").hide();
            console.log(angular_this.paso);
          }
          angular_this.versions.forEach( function (arrayItem){
            if(angular_this.version_select==arrayItem.id)
              angular_this.version_select_name = arrayItem.name;

          });

          if( $("#fecha_nacimiento").val()!="" && $("#fecha_nacimiento").val()!=null)
            angular_this.birth_date_select = $("#fecha_nacimiento").val();
          else angular_this.birth_date_select = $("#fecha_nacimiento_mobile").val();
          
          
          let form_data = {
              "email": angular_this.email_select,
              "maker_name": angular_this.maker_select,
              "maker_id": angular_this.maker_select,
              "year": angular_this.years_selected,
              "car_model_name": angular_this.model_select,
              "car_model_id": angular_this.model_select,
              "version_name": angular_this.version_select_name,
              "version_id": angular_this.version_select,
              "zipcode": angular_this.zip_code_select,
              "birth_date": angular_this.birth_date_select,
              "gender": angular_this.gender_select,
              "telephone": angular_this.cellphone_select
           }
            console.log(form_data);
            angular_this.http.post('http://52.91.226.205/api/v1/quotations/create_quotation',form_data).subscribe(data => {
              console.log(data);
              if(angular_this.tipo_flujo==1 && angular_this.bandera!=2)
                $('#idModalSuccess').modal('toggle'); //Modal de éxito de cotización //Le hace falta validar el codigo postal
              else {
                angular_this.cotizacion=data;
                var id = angular_this.cotizacion.id;
                var token = angular_this.cotizacion.token;
                window.location.href = "/cotizaciones/"+id+"?token="+token; 
              }

            },
            error =>{ 
              console.log(error)  // error path
              $('#idModalError').modal('toggle'); //Modeal de error de cotización
            }
           );
        }
      });
    }

    get_models() {
       if(this.years_selected  && this.maker_select ){
         this.http.get('http://52.91.226.205/api/v1/quotations/models?year='+this.years_selected+'&maker='+this.maker_select+'').subscribe(data => {
           this.all_models = data;
           //console.log(data);
           let modelos = [];
           let modelo;
           $(this.all_models).each(function(index,obj) {
               modelo = {
                "id_model": index,
                "id": obj.id,
                "name": obj.name
              }
              modelos.push(modelo);

            });
           //console.log(modelos);
           this.models = modelos;
         },
         error => console.log(error)  // error path
       );
       }
    }

    get_version() {
     this.http.get('http://52.91.226.205/api/v1/quotations/model_versions?year='+this.years_selected+'&maker='+this.maker_select+'&model='+this.model_select+'').subscribe(data => {
       this.versions = data;
       console.log(data)
     },
     error => console.log(error)  // error path
    );
    }

    get_years() {
      this.http.get('http://52.91.226.205/api/v1/quotations/years').subscribe(data => {
        this.years = data;
        console.log(data);
      },
      error => console.log(error)  // error path
      );
    }

    get_makers() {
      var i=0;
      this.http.get('http://52.91.226.205/api/v1/quotations/makers').subscribe(data => {
        this.makers = data;
        /**let angular_this = this;
        let y = [];
        this.all_makers = data;
        this.all_makers.forEach( function (arrayItem){
          arrayItem.url = "assets/img/makers/"+ arrayItem.name + ".png";
            $.get(arrayItem.url)
            .done(function() {
              y.push(arrayItem);
              //$("#idMakers").append('<div class="col-3 col-sm-3 col-md-3" style><img src="/assets/img/makers/'+arrayItem.name+'.png" class="img-fluid border" alt="" id=""></div>');
            }).fail(function() {
              // Image doesn't exist - do something else.
            });
            angular_this.makers = y;
            console.log(angular_this.makers);
        });
        **/
      },
      error => console.log(error)  // error path
      );
    }

    changeGender(){
      var angular_this = this
      setTimeout(function(){  angular_this.gender_select = $("input[name='sexo']:checked").val(); }, 1000);
    }

    click(tipo,id){
      var angular_this = this;
      var size = $('.'+tipo).size()-1;

      $("#"+id).addClass("checkbox-div-active");
      if(this.paso==1)
        this.maker_select = id;
      if(this.paso==2){
        this.years_selected = id;
        this.get_models();
      }
      if(this.paso==3){
        this.id_model_select = id;
        this.model_select = $("#id_"+id).val();
        this.get_version();
      }
      if(this.paso==4){
        this.version_select = id;
        $("#fieldset5").show();
      }

      

      $("."+tipo).each(function(index) {
        let id2 = $(this).attr('id');
        if(id2!=id){
          $("#"+id2).removeClass("checkbox-div-active");
        }

        if(index==size){
          angular_this.next();
        }
      });
    }
    next(){
      this.paso = this.paso+1;
      var progress = 20*this.paso;
      $("#progress-bar").css("width",progress+"%");
    }

    prev(){
      var anterior = this.paso-1;
      this.paso = anterior;
      var progress = 20*this.paso;
      if(this.paso!=5) $("#fieldset5").hide();
      $("#progress-bar").css("width",progress+"%");

    }

}

import { Component, OnInit, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { QuotationService } from '../../services/quotation.service';
import { HubspotService } from '../../services/hubspot.service';
import { OperatorsService } from '../../services/operators.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import { Maker } from '../../constants/maker';
import { Year } from '../../constants/year';
import { Model } from '../../constants/model';
import { Version } from '../../constants/version';
import { Quotation } from '../../constants/quotation';
import { Quotation2 } from '../../constants/quotation2';
import { Seller } from '../../constants/seller';

//import * as M from "node_modules/materialize-css/dist/js/materialize.min.js";
import * as $ from 'jquery';
declare var M:any;
import Swiper from 'swiper';
import swal from 'sweetalert';
//import { Verify } from 'crypto';


@Component({
  selector: 'app-panelquotes',
  templateUrl: './panelquotes.component.html',
  styleUrls: ['./panelquotes.component.scss']
})
export class PanelquotesComponent implements OnInit {
	quotes: any = [];
	quotation =  new Quotation('','','','','','','','','',2,'','','','');
	quotation2 = new Quotation2(null,null);
	sellers: Seller[];
	page: any = 1;
	filters:any;
	seller_id:any;
	quotation_id:any;
	busqueda:any = "";
	quote_info: any = {
		page: 1,
		seller_id: "",
		quote_state: "pending",
		payment_state: "",
		seller_state: "",
		term: ""
	}

	constructor(@Inject(PLATFORM_ID) private platformId: Object,private route: ActivatedRoute, private location: Location, private router: Router, private quotationService: QuotationService, private hubspotService: HubspotService, private operatorsService: OperatorsService) { }
	ngOnInit() {
		//Se traen los vendedores
		this.operatorsService.getSellers()
			.subscribe((data:any)=>{
				this.sellers = data;
				console.log(this.sellers);
			});
		this.operatorsService.getFilters()
			.subscribe((data:any)=>{
				this.filters =data;
			});
		this.operatorsService.getQuotes(this.quote_info)
			.subscribe((data:any)=>{
				this.quotes = data.quotes;
				console.log(data);
			});
	}
	ordenar(param,orden){
		if(param=='id' && orden=='ASC') this.quotes.sort(function(a, b){return a.id - b.id});
		if(param=='id' && orden=='DESC') this.quotes.sort(function(a, b){return b.id - a.id});
	}
	setQuotation(quote){
		console.log(quote);
		this.quotation2.user = {
			phone: quote.user.phone,
			age: quote.user.age,
			gender: quote.user.gender,
			birth_date: quote.user.birth_date,
			zip_code: quote.user.zip_code,
			first_name: quote.user.first_name,
			last_name: quote.user.last_name,
			second_last_name: quote.user.second_last_name,
			email: quote.user.email
		}
		this.quotation2.car = {
			maker: quote.car.maker,
			year: quote.car.year,
			model: quote.car.model,
			version_id: quote.car.version_id,
			id: quote.car.id
		}
	}
	
	//ACCIONES
	changeSellerModal(quotation_id,seller_id){
		console.log("Vendedor Actual: "+seller_id);
		this.seller_id = seller_id;
		if(seller_id==null) this.seller_id = "";
		this.quotation_id = quotation_id;
	}
	changeSeller(){
		console.log("Vendedor Nuevo: "+this.seller_id+" / quote:"+this.quotation_id);
		let full_name="";
		let seller_id=this.seller_id;
		
		this.operatorsService.updateSellerQuotation(this.quotation_id,this.seller_id)
			.subscribe((data:any)=>{
				this.sellers.forEach(
					item => {
						if(item.id==this.seller_id){
							full_name = item.full_name;
							seller_id = item.id;
						} 
					}
				);
				console.log("Nombre: "+full_name);
				this.quotes.forEach(
					item => {
						if(item.id==this.quotation_id){
							item.seller.id = seller_id;
							item.seller.full_name = full_name;
							swal("Se ha cambiado al vendedor correctamente", "", "success");
						} 
					}
				);
				
			});
	}

	sendEmailQuote(quote_id){
		this.operatorsService.sendEmailQuotes(quote_id)
			.subscribe((data:any)=>{
				console.log(data);
				swal("Se ha enviado el correo correctamente", "", "success");
			});
	}

	searchQuote(){
		this.quote_info = {
			page: this.page,
			seller_id: "",
			quote_state: "pending",
			payment_state: "",
			seller_state: "",
			term: this.busqueda
		}
		//console.log(this.quote_info)

		this.operatorsService.getQuotes(this.quote_info)
			.subscribe((data:any)=>{
				this.quotes = data.quotes;
				console.log(data);
			});
	}

}

import { Component, OnInit, Inject, PLATFORM_ID} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { QuotationService } from '../../services/quotation.service';
import { Router,ActivatedRoute } from '@angular/router';
import { NgForm} from '@angular/forms';
import { Location } from '@angular/common';
import { Maker } from '../../constants/maker';
import { Year } from '../../constants/year';
import { Model } from '../../constants/model';
import { Version } from '../../constants/version';
import { Quotation } from '../../constants/quotation';
import { Policy } from '../../constants/policy';
import { Aig } from '../../constants/aig';


@Component({
  selector: 'app-cart',
  templateUrl: './cart2.component.html',
  styleUrls: ['./cart2.component.scss']
})
export class Cart2Component implements OnInit {
	checkbox_dir: boolean = false;
	quote_id:any;
	package_id:any=1;
	package: any = null;
	packages:any = null;
	total_cost: any = null;
	quotation:any; 
	zipcodeBoolean: boolean = true;
	suburbs1:any = Array();
	suburbs2: any = Array();
	aig: Aig = null;
	policy =  new Policy('','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','','');
	
	constructor(@Inject(PLATFORM_ID) private platformId: Object,private route: ActivatedRoute, private location: Location, private router: Router, private quotationService: QuotationService) { }
	ngOnInit() {
		this.quote_id = this.route.snapshot.params['id'];
		this.package_id = this.route.snapshot.params['package'];
		if (isPlatformBrowser(this.platformId)) {
			if(!localStorage.getItem("cart")){
				this.router.navigate(['/compra-kilometros/'+this.quote_id+'/'+this.package_id]);
			}
			this.policy = JSON.parse(localStorage.getItem("cart"));
			this.suburbs1 = JSON.parse(localStorage.getItem("suburbs1"));
		}
		this.getQuotation();
	}
	getQuotation(){
		this.quotationService.getQuotation(this.quote_id)
	    	.subscribe((data:any) => {
	    		this.quotation=data.quote;
	    		this.aig = data.aig;
	    		this.packages 	= data.cotizaciones;
	    		this.getPackage();
	    	});
	}
	getPackage(){
		this.quotationService.getPackage(this.package_id)
	    	.subscribe((data:any) => {
	    		this.packages.forEach( item => {
	    			if(item.package==data.kilometers){
	    				this.package = item;
	    				this.total_cost = item.total_cost;
	    			}
          		});
	    	});
	}
	changeDir(){
		if(this.checkbox_dir){
			this.checkbox_dir 		= false;
			this.policy.street2 	= this.policy.street1;
			this.policy.ext_number2 = this.policy.ext_number1;
			this.policy.int_number2 = this.policy.int_number1;
			this.policy.zipcode2 	= this.policy.zipcode1;
			this.policy.suburb2 	= this.policy.suburb1;
		}
		else{ 
			this.checkbox_dir = true;
			this.policy.street2 	= "";
			this.policy.ext_number2 = "";
			this.policy.int_number2 = "";
			this.policy.zipcode2 	= "";
			this.policy.suburb2 	= "";
		}
	}
	validateZipcode(){
		this.quotationService.validateZipcode(this.policy.zipcode2)
	    	.subscribe((data:any) => {
	    		if(data.status==1){
	    			this.getSuburbs(this.policy.zipcode2);
	    			this.zipcodeBoolean = true;
	    		}
	    		else this.zipcodeBoolean = false;
	    	});
	}
	getSuburbs(zipcode){
		this.quotationService.getSububrs(zipcode)
	    	.subscribe((data:any) => {
	    		console.log(data);
	    		this.suburbs2 = data;
	    		this.policy.suburb2= "";
	    		this.policy.state2 = data[0].state;
	    		this.policy.city2  = data[0].municipality;
	    		
	    	});
	}
	onSubmit(){
		console.log(this.policy);
		localStorage.setItem("cart",JSON.stringify(this.policy));
		this.router.navigate(['/compra-kilometros/'+this.quote_id+'/'+this.package_id+'/3']);
	}

}
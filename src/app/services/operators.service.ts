import { Injectable } from '@angular/core';
import { throwError, Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Login } from '../constants/login';
import { Seller } from '../constants/seller';
import { dashCaseToCamelCase } from '@angular/animations/browser/src/util';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  withCredentials: true
};
@Injectable({
  providedIn: 'root'
})
export class OperatorsService {
	url = 'https://dev2.sxkm.mx/api/v3/';
	constructor(private http: HttpClient) { }

	getQuotes(quote_info){
		console.log(quote_info)
		let url = this.url+"quotes?page="+quote_info.page;
		if(quote_info.term!="")
			url = this.url+"quotes/search?term="+quote_info.term+"&page="+quote_info.page;

		if(quote_info.seller_id)
			url+="&seller_id="+quote_info.seller_id;
		if(quote_info.quote_state)
			url +="&quote_state="+quote_info.quote_state;
		if(quote_info.payment_state)
			url += "&payment_state="+quote_info.payment_state;
		if(quote_info.seller_state)
			url += "&seller_state="+quote_info.seller_state;
	
		console.log(url)
		return this.http.get(url, httpOptions)
		    .pipe(
		      tap((data:any) => this.log('getQuotes')),
		      catchError(this.handleError('error getQuotes', []))
		    );
	}
	requote(quotation){
		return this.http.post(this.url+"quotes",quotation,httpOptions)
				.pipe(
					tap(data=> this.log('requote')),
					catchError(this.handleError("ERROR requote", []))
				)
	}
	getSellers(): Observable<Seller[]> {
		return this.http.get<Seller[]>(this.url+"sellers", httpOptions)
		    .pipe(
		      tap(sellers => this.log('fetched sellers')),
		      catchError(this.handleError('error getSellers', []))
		    );
	}
	getFilters(){
		return this.http.get(this.url+"quotes/filters",httpOptions)
		    .pipe(
		      tap(data => this.log('getFilters')),
		      catchError(this.handleError('error getFilters', []))
		    );
	}
	sendEmailQuotes(email_quote){
		let post = {
			email: email_quote.email
		}
		return this.http.post(this.url+"quotes/"+email_quote.quote_id+"/send_email", post,httpOptions)
		    .pipe(
		      tap(data => this.log('sendEmailQuotes')),
		      catchError(this.handleError('error sendEmailQuotes', []))
		    );
	}

	updateSellerQuotation(quote_id,seller_id){
		return this.http.post(this.url+"quotes/"+quote_id+"/assign_seller?seller_id="+seller_id,null,httpOptions)
		    .pipe(
		      tap(data => this.log('updateSellerQuotation')),
		      catchError(this.handleError('error updateSellerQuotation', []))
		    );
	}
	deleteQuote(quote_id){
		return this.http.post(this.url+"quotes/"+quote_id+"/cancel",null,httpOptions)
		    .pipe(
		      tap(data => this.log('deleteQuote')),
		      catchError(this.handleError('error deleteQuote', []))
		    );
	}

	getQuote(quote_id){
		return this.http.get(this.url+"quotes/"+quote_id+"?",httpOptions)
		.pipe(
			tap(data => this.log('getQuote')),
			catchError(this.handleError('error getQuote', []))
		);
	}

	pay_quote(quote_id,payment){
		return this.http.post(this.url+'quotes/'+quote_id+'/pay',payment,httpOptions)
		.pipe(
			tap(data=>this.log('pay_quote')),
			catchError(this.handleError('error pay_quote',[]))
		)
	}
	getPolicy(policy_id){
		return this.http.get(this.url+"policies/"+policy_id,httpOptions)
		.pipe(
			tap(data => this.log('getPolicy')),
			catchError(this.handleError('error getPolicy', []))
		);
	}
	getEditableInfoPolicy(){
		return this.http.get('policies/35372/editable_info')
	}
	cancelPolicy(policy_id){
		return this.http.post(this.url+'policies/'+policy_id+'/cancel',null,httpOptions)
		.pipe(
			tap(data=>this.log('cancelPolicy')),
			catchError(this.handleError('error cancelPolicy',[]))
		)
	}

	updateSellerPolicy(policy_id,seller_id){
		let post = {
			seller_id: seller_id,
			update: "true"
		}
		return this.http.post(this.url+"policies/"+policy_id+"/assign_seller",post,httpOptions)
		    .pipe(
		      tap(data => this.log('updateSellerPolicy')),
		      catchError(this.handleError('error updateSellerPolicy', []))
		    );
	}

	searchDevice(imei){
		return this.http.get(this.url+"devices/autocomplete?term="+imei,httpOptions)
		.pipe(
			tap(data => this.log('searchDevice')),
			catchError(this.handleError('error searchDevice', []))
		);
	}
	updateDevicePolicy(policy){
		let post = {
			device_id: policy.device_id,
			update: "true"
		}
		return this.http.post(this.url+"policies/"+policy.policy_id+"/assign_device",post,httpOptions)
		    .pipe(
		      tap(data => this.log('updateDevicePolicy')),
		      catchError(this.handleError('error updateDevicePolicy', []))
		    );
	}



	//Policies
	getPolicies(policies_info){
		let params = "";
		let url = this.url+"policies";
		if(policies_info.search!="")
			url+='/search';
		if(policies_info.page)
			params = "?page="+policies_info.page;
		if(policies_info.policy_states && policies_info.policy_states.length<3){
			policies_info.policy_states.forEach(element => {
				params += "&policy_states[]="+element;	
			});
		}
		if(policies_info.membership_states){
			if(policies_info.membership_states.length == 1){
				policies_info.membership_states.forEach(element => {
					params += "&membership_state="+element;
				});
			}	
		}
		if(policies_info.seller_states){
			if(policies_info.seller_states.length == 1){
				policies_info.seller_states.forEach(element => {
					params += "&seller_state="+element;
				});
			}	
		}
		if(policies_info.device_states && policies_info.device_states.length<4){
			policies_info.device_states.forEach(element => {
				params += "&device_states[]="+element;	
			});
		}
		if(policies_info.vin_states){
			if(policies_info.vin_states.length == 1){
				policies_info.vin_states.forEach(element => {
					params += "&vin="+element;
				});
			}	
		}
		if(policies_info.km_states && policies_info.km_states.length<3){
			policies_info.km_states.forEach(element => {
				params += "&km_states[]="+element;	
			});
		}
		if(policies_info.search!="")
			params += '&term='+policies_info.search;
		console.log(params);
		return this.http.get(url+params,httpOptions)
			.pipe(
				tap(data => this.log('getPolicies')),
		      catchError(this.handleError('error getPolicies', []))
			);
	}
	
	private handleError<T> (operation = 'operation', result?: T) {
		return (error: any): Observable<T> => {
			// TODO: send the error to remote logging infrastructure
		    console.error(error); // log to console instead
		 
		    // TODO: better job of transforming error for user consumption
		    this.log(`${operation} failed: ${error.message}`);
		 
		    // Let the app keep running by returning an empty result.
		    return of(result as T);
		};
	}

	/** Log a HeroService message with the MessageService */
	private log(message: string) {
	    console.log(message)
	}
}
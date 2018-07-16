import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Api } from "../api.constants";
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private router : Router){}
	canActivate(
	    next: ActivatedRouteSnapshot,
	    state: RouterStateSnapshot): boolean {
	    if(localStorage.getItem("sesion")!=null ){
	    	//let expiration = localStorage.getItem("expiration");

	    	return true;
	    }
	    this.router.navigate(["/login"]);
	    return false
  	}
}
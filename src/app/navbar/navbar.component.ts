import { Component, OnInit, Inject, PLATFORM_ID, ElementRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router,ActivatedRoute, NavigationStart } from '@angular/router';
import { NgForm} from '@angular/forms';
import { Location } from '@angular/common';

import * as $ from 'jquery';
declare var M:any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  	landing: any = 1;
  	constructor(@Inject(PLATFORM_ID) private platformId: Object,private route: ActivatedRoute, private location: Location, private router: Router) { }

  	ngOnInit(){
       if (isPlatformBrowser(this.platformId)) {
    		this.router.events.subscribe(event => {
          if(event instanceof NavigationStart) {
            let URLactual = window.location.pathname;
            if(URLactual=="/"){
              localStorage.setItem("landing","");
            }
            if(URLactual=="/aig"){
              localStorage.setItem("landing","aig");
            }
            if(URLactual =="/potosi"){
              localStorage.setItem("landing","potosi");
            }
            this.landing = localStorage.getItem("landing");
            console.log("HOLA "+localStorage.getItem("landing"));     
          }
        });
      }
  	}

}

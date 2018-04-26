import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new-quote',
  templateUrl: './new-quote.component.html',
  styleUrls: ['./new-quote.component.css']
})
export class NewQuoteComponent implements OnInit {
	author: any = [];
	new_quote: any;
 	constructor(
 		private _httpService: HttpService,
 		private _route: ActivatedRoute,
    	private _router: Router
 		) { }

  	ngOnInit() {
  	this.grab_author();
  	this.new_quote = {text: ""}
  	}

  	grab_author(){
  		this._route.params.subscribe((params: Params) => {
  			let id = params['id'];
  			let observable = this._httpService.edit_grab({id});
  			observable.subscribe(data => {
  				this.author = data.json().data[0];
  			});
  		});
 	}
 	add_quote(event){
 		event.preventDefault();
 		console.log(this.author);
 		let observable = this._httpService.add_quote({quote: this.new_quote, author: this.author._id});
 		observable.subscribe(data => {
 			this._router.navigate(['/quotes', this.author._id]); 			
 		})
 	}

}

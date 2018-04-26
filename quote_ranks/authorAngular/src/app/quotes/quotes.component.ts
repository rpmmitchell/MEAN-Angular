import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {
	id: string;
	quotes: any = [];
	author: any = [];
  	constructor(
  		private _httpService: HttpService,
  		private _route: ActivatedRoute,
    	private _router: Router

  	) { }

  ngOnInit() {
  	this.quotes_id();
  	this.grab_author();
  }

	quotes_id(){
		this._route.params.subscribe((params: Params) => {
			let id = params['id'];
			let observable = this._httpService.quotes(id);
			observable.subscribe(data => {
				this.quotes = data.json().data;
				console.log(this.quotes);
			});
		})
  	}

  	grab_author(){
  		this._route.params.subscribe((params: Params) => {
  			let id = params['id'];
  			console.log(id);
  			let observable = this._httpService.edit_grab({id});
  			observable.subscribe(data => {
  				console.log("FROM THE EDIT AUTHOR COMP", data.json());
  				this.author = data.json().data[0];
  				console.log(this.author);
  			});
  		});
 	}

 	vote_up(id){
 		let observable = this._httpService.vote_up(id);
 		observable.subscribe(data => {
 			console.log("VOTED UP", data.json());
 			this.quotes_id();
 		})
 	}

 	vote_down(id){
 		let observable = this._httpService.vote_down(id);
 		observable.subscribe(data => {
 			console.log("VOTED UP", data.json());
 			this.quotes_id();
 		})
 	}

 	delete_button(id){
  		let observable = this._httpService.delete_quote(id);
  		observable.subscribe(data => {
  			console.log(data.json());
  			this.quotes_id();
  		});
  	}

}


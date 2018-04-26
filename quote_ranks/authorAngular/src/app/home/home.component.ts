import { Component, OnInit } from '@angular/core';
import { HttpService } from'../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
	authors: any = []; //important to have this line to add iterables from returning data.
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
    private _router: Router
  	) { }

  ngOnInit() {
  	this.all_authors();
  }
  all_authors(){
  	let observable = this._httpService.authors();
  	observable.subscribe(data => {
  		this.authors = data.json().data;	
  	});
  }
  delete_button(id){
  	let observable = this._httpService.delete(id);
  	observable.subscribe(data => {
  		console.log(data.json());
  		this.all_authors();
  	})
  }

}

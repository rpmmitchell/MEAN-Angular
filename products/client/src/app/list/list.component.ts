import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	display_products: any = [];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
  	this.show_products();
  }
  show_products(){
  	let observable = this._httpService.all_products();
  	observable.subscribe(data => {
  		console.log("GOT ALL PRODUCTS", data.json());
  		this.display_products = data.json().data;
  		console.log(this.display_products);
  	})
  }
  delete_prod(id){
  	let observable = this._httpService.delete({prod_id: id});
  	observable.subscribe(data => {
  		console.log("DELETE THIS PRODUCT", data.json());
      this.show_products();
  	})
  }

}

import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpService {

  constructor(private _http: Http) { 

  }
  ngOnInit(){
  	
  }
  create(product){
  	console.log("INSIDE THE HTTP SERVICE", product);
  	return this._http.post('products/new', product);
  }
  all_products(){
  	return this._http.get("products");
  }
  delete(id){
  	console.log("INSIDE HTTP SERIVCE", id);
  	return this._http.delete("products/delete/" + id.prod_id);
  }
  edit_service(id){
    console.log("HI IN EDIT", id);
    return this._http.get('products/grab/' + id );
  }
  edit(product){
    console.log("INSIDE EDIT SERIVCE", product);
    return this._http.put('/products/update/' + product._id, product);
  }

}

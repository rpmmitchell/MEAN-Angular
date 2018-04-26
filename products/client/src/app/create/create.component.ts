import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
	new_prod: any;
  superErrors: any = [];
  constructor(
    private _httpService: HttpService,
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit() {
  	this.new_prod = {name: "", price: "", image: ""}
  }
  create_prod(event){
  	event.preventDefault();
  	console.log(this.new_prod);
  	let observable = this._httpService.create(this.new_prod);
  	observable.subscribe(data => {
  		console.log("SUBSCRIBE TO OBSERVABLE INSIDE CREATE", data.json());
      this._router.navigate(['list'])
  	},error => {
      this.superErrors = error.json();
      console.log(this.superErrors);
    })
  }

}

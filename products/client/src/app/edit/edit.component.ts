import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	id: string;
	edit_product: any;
	superErrors: any = [];
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
    private _router: Router
  	) { }

  ngOnInit() {
  	this.edit_grab()
  	this.edit_product = {name: "", price: "", image: ""}
  }
	edit_grab(){
		this._route.params.subscribe((params: Params) => {
			let id = params['id'];
			console.log(id);
			let observable = this._httpService.edit_service(id);
			observable.subscribe(data => {
				console.log("FROM THE EDIT PRODUCT COMP", data.json());
				this.edit_product = data.json().data[0];
				console.log(this.edit_product);
			});
		});
	}
	edit_prod(event){
		event.preventDefault();
		console.log(this.edit_product);
		let observable = this._httpService.edit(this.edit_product);
		observable.subscribe(data => {
			console.log("EDITED TO THIS IN COMP", data.json());
			this._router.navigate(['list']);
		},error => {
			this.superErrors = error.json();
			console.log(this.superErrors);
		})
	}

}

import { Component, OnInit } from '@angular/core';
import { HttpService } from'../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	edit_data: any = [];
	id: string;
	edit_author_name: any;
  superErrors: any = [];
  constructor(
  	private _httpSerivce: HttpService,
  	private _route: ActivatedRoute,
    private _router: Router
  	) { }

  ngOnInit() {
  	this.edit_author();
  	this.edit_author_name = {name: ""}
  }
  edit_author(){
  	this._route.params.subscribe((params: Params) => {
  		let id = params['id'];
  		let observable = this._httpSerivce.edit_grab({id});
  		observable.subscribe(data => {
  			console.log("FROM THE EDIT AUTHOR COMP", data.json());
  			this.edit_author_name = data.json().data[0];
  		});
  	});
  }
  edit(event){
  	event.preventDefault();
  	this._route.params.subscribe((params: Params) => {
  		let id = params['id'];
  		console.log("EDIT ID", id);
  		console.log(this.edit_author_name);
  		let observable = this._httpSerivce.edit(this.edit_author_name);
  		observable.subscribe(data => {
  			console.log("FROM THE EDIT AUTHOR COMP", data.json());
  			this._router.navigate(['']);
  		},error => {
        this.superErrors = error.json();

      });
  		
  	})
  }

}

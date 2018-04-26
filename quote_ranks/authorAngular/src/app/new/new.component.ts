import { Component, OnInit } from '@angular/core';
import { HttpService } from'../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
	author: any;
  superErrors: any = [];
  constructor(
  	private _httpService: HttpService,
  	private _route: ActivatedRoute,
    private _router: Router
  	) { }

  ngOnInit() {
  	this.author = {name: ""};
  }
  submit_author(event){
  	event.preventDefault();
  	let observable = this._httpService.add({author: this.author});
  	observable.subscribe(data => {
      this._router.navigate(['']);
  	},error => {
      this.superErrors = error.json();
      console.log(this.superErrors);
    });
  }
}

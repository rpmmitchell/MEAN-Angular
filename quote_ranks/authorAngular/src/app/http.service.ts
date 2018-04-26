import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class HttpService implements OnInit {

  constructor(private _http: Http) {

  }
  ngOnInit(){

  }
  add(author){
  	console.log('inside http serivce', author);
  	return this._http.post('/authors/new', author);
  }
  authors(){
  	return this._http.get('/authors');
  }
  delete(id){
  	return this._http.delete('authors/delete/' + id);
  }
  edit_grab(id){
  	return this._http.get('/author_grab/' + id.id);
  }
  edit(author){
  	return this._http.put('/authors/update/' + author._id, author); //PASSING AUTHOR WITH A COMMA DOES NOT TIE IT INTO THE URL. ALLOWS FOR IT TO BE PASSED AS A OBJECT THEN GRABED WITH req.body IN THE SERVER.JS FILE
  }
  quotes(id){
    return this._http.get('/authors/quotes/' + id);
  }
  vote_up(id){
    console.log( "HELLO FROM SERVICE", id);
    return this._http.get('/authors/quotes/up/' + id);
  }
  vote_down(id){
    return this._http.get('/authors/quotes/down/' + id);
  }
  delete_quote(id){
    return this._http.delete('/authors/quotes/delete/' + id);
  }
  add_quote(quote){
    console.log(quote);
    return this._http.post('/authors/quotes/' + quote.author, quote);
  }

}

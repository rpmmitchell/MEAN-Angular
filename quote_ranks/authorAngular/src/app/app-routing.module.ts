import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { QuotesComponent} from './quotes/quotes.component';
import { NewQuoteComponent } from './new-quote/new-quote.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'new', component: NewComponent },
	{ path: 'edit/:id', component: EditComponent },
	{ path: 'quotes/:id', component: QuotesComponent },
	{ path: 'quotes/:id/new', component: NewQuoteComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

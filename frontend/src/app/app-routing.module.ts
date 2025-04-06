import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {IndexComponent} from './components/index/index.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {DetailComponent} from './components/detail/detail.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'about', component: IndexComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'products/:category/:id', component: DetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

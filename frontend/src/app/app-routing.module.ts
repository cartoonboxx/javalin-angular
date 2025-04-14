import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {IndexComponent} from './components/index/index.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {DetailComponent} from './components/detail/detail.component';
import {AboutComponent} from './components/about/about.component';
import {CategoryComponent} from './components/category/category.component';
import {SearchComponent} from './components/search/search.component';
import {BasketComponent} from './components/basket/basket.component';
import {AdminComponent} from './components/admin/admin.component';
import {ProductsComponent} from './components/products/products.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'about', component: AboutComponent},
  {path: 'contacts', component: ContactsComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'products/:category', component: CategoryComponent},
  {path: 'products/:category/:id', component: DetailComponent},
  {path: 'search', component: SearchComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'admin', component: AdminComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

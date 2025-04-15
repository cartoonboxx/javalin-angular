import {NgModule} from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/UI/header/header.component';
import { FooterComponent } from './components/UI/footer/footer.component';
import { IndexComponent } from './components/index/index.component';
import { SliderComponent } from './components/UI/slider/slider.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { DetailComponent } from './components/detail/detail.component';
import { GalleryComponent } from './components/UI/gallery/gallery.component';
import { AboutComponent } from './components/about/about.component';
import { CategoryComponent } from './components/category/category.component';
import { DropdownComponent } from './components/UI/dropdown/dropdown.component';
import { SearchComponent } from './components/search/search.component';
import { BasketComponent } from './components/basket/basket.component';
import { AdminComponent } from './components/admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PositiveNumberOnlyDirective } from './directives/positive-number-only.directive';
import { ProductsComponent } from './components/products/products.component';
import { CartModalComponent } from './components/UI/cart-modal/cart-modal.component';
import { SendcartComponent } from './components/UI/sendcart/sendcart.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    SliderComponent,
    ContactsComponent,
    DetailComponent,
    GalleryComponent,
    GalleryComponent,
    AboutComponent,
    CategoryComponent,
    DropdownComponent,
    SearchComponent,
    BasketComponent,
    AdminComponent,
    PositiveNumberOnlyDirective,
    ProductsComponent,
    CartModalComponent,
    SendcartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

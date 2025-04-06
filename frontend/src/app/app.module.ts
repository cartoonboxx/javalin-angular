import { NgModule } from '@angular/core';
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
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

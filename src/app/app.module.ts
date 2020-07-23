import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreService } from './store.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShelfComponent } from './shelf/shelf.component';
import { ShelfdivisionComponent } from './shelfdivision/shelfdivision.component';
import { ShelfitemComponent } from './shelfitem/shelfitem.component';
import { BasketComponent } from './basket/basket.component';

@NgModule({
  declarations: [
    AppComponent,
    ShelfComponent,
    ShelfdivisionComponent,
    ShelfitemComponent,
    BasketComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreService } from './domain/service/store.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShelfComponent } from './shelf/shelf.component';
import { ShelfitemComponent } from './shelfitem/shelfitem.component';
import { BillComponent } from './bill/bill.component';

@NgModule({
  declarations: [
    AppComponent,
    ShelfComponent,
    ShelfitemComponent,
    BillComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }

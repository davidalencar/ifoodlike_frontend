import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { StoreService } from './domain/service/store.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShelfComponent } from './shelf/shelf.component';
import { ShelfitemComponent } from './shelfitem/shelfitem.component';
import { BillComponent } from './bill/bill.component';
import { CustomerComponent } from './customer/customer.component';
 
@NgModule({
  declarations: [
    AppComponent,
    ShelfComponent,
    ShelfitemComponent,
    BillComponent,
    CustomerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxMaskModule.forRoot()
  ],
  providers: [StoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule, IConfig } from 'ngx-mask'
import { StoreService } from './services/store.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShelfComponent } from './shelf/shelf.component';
import { ShelfitemComponent } from './shelfitem/shelfitem.component';
import { BillComponent } from './bill/bill.component';
import { CustomerComponent } from './customer/customer.component';
import { AccountComponent } from './account/account.component';
import { UserService } from './services/user.service';
import { ItemsComponent } from './items/items.component';
import { AddressComponent } from './address/address.component' 
import { CookieService } from 'ngx-cookie-service';
import { SalesComponent } from './sales/sales.component';
import { StoresComponent } from './stores/stores.component';
import { UserComponent } from './user/user.component'

@NgModule({
  declarations: [
    AppComponent,
    ShelfComponent,
    ShelfitemComponent,
    BillComponent,
    CustomerComponent,
    AccountComponent,
    ItemsComponent,
    AddressComponent,
    SalesComponent,
    StoresComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgxMaskModule.forRoot()
  ],
  providers: [
    StoreService,
    UserService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

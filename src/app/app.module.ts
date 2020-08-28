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
import { DashBoardService } from './services/dashboard.service';
import { ItemsComponent } from './items/items.component';
import { AddressComponent } from './address/address.component' 
import { CookieService } from 'ngx-cookie-service';
import { SalesComponent } from './sales/sales.component';
import { UserComponent } from './user/user.component';
import { NavBackComponent } from './nav-back/nav-back.component';
import { ProductComponent } from './product/product.component';
import { StoreComponent } from './store/store.component';
import { PickingComponent } from './picking/picking.component';
import { ProductsComponent } from './products/products.component'

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
    UserComponent,
    NavBackComponent,
    ProductComponent,
    StoreComponent,
    PickingComponent,
    ProductsComponent
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
    DashBoardService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

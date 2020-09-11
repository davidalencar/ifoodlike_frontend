import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShelfComponent } from './shelf/shelf.component'
import { BillComponent } from './bill/bill.component'
import { AccountComponent } from './account/account.component'
import { ItemsComponent } from './items/items.component'
import { AddressComponent } from './address/address.component'
import { UserComponent } from './user/user.component'
import { SalesComponent } from './sales/sales.component'
import { CustomerComponent } from './customer/customer.component'
import { ProductComponent } from './product/product.component'
import { ProductsComponent } from './products/products.component'
import { StoreComponent } from './store/store.component'
import { PickingComponent } from './picking/picking.component';
import { SubItemComponent } from './sub-item/sub-item.component';
import { ChangepwdComponent } from './changepwd/changepwd.component'

import { StoreLoadedGuard } from './guards/storeLoaded.guard'
import { AuthGuard } from './guards/auth.guard'


const routes: Routes = [
  { path: '', component: AccountComponent },
  { path: ':id', component: ShelfComponent},
  { path: ':id/items', component: ItemsComponent, canActivate: [StoreLoadedGuard]},
  { path: ':id/bill', component: BillComponent, canActivate: [StoreLoadedGuard]},
  { path: ':id/customer', component: CustomerComponent, canActivate: [StoreLoadedGuard]},
  { path: ':id/address', component: AddressComponent, canActivate: [StoreLoadedGuard]},
  { path: 'user/board', component: UserComponent, canActivate: [AuthGuard]},
  { path: ':id/sales', component: SalesComponent, canActivate: [AuthGuard]},
  { path: ':id/cust', component: CustomerComponent, canActivate: [AuthGuard]},
  { path: ':id/products', component: ProductComponent, canActivate: [AuthGuard]},
  { path: ':id/product', component: ProductsComponent, canActivate: [AuthGuard]},
  { path: ':id/store', component: StoreComponent, canActivate: [AuthGuard]},
  { path: ':id/picking', component: PickingComponent, canActivate: [AuthGuard]},
  { path: ':id/subitem', component: SubItemComponent, canActivate: [AuthGuard]},
  { path: 'user/pwd', component: ChangepwdComponent, canActivate: [AuthGuard]},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShelfComponent } from './shelf/shelf.component'
import { BillComponent } from './bill/bill.component'
import { CustomerComponent } from './customer/customer.component'
import { AccountComponent } from './account/account.component'
import { ItemsComponent } from './items/items.component'

const routes: Routes = [
  { path: '', component: AccountComponent },
  { path: ':id', component: ShelfComponent },
  { path: ':id/items', component: ItemsComponent},
  { path: ':id/bill', component: BillComponent},
  { path: ':id/customer', component: CustomerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

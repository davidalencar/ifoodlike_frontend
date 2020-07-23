import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShelfComponent } from './shelf/shelf.component'
import { BillComponent } from './bill/bill.component'

const routes: Routes = [
  { path: '', component: ShelfComponent },
  { path: 'bill', component: BillComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

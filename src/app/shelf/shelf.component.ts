import { Component, OnInit } from '@angular/core';
import { StoreService } from '../domain/service/store.service'

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class ShelfComponent implements OnInit {


  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
    
  }

  basketProducts(){
    return this.storeService.products.filter(p=>p.qty >0)
  }

  countProducts(){
    return this.basketProducts().length;
  }

}

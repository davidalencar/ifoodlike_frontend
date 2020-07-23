import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service'

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class BasketComponent implements OnInit {


  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
  }

  

  countProducts(){
    return this.storeService.basketProducts().length;
  }

}

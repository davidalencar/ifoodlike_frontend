import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service'

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class ShelfComponent implements OnInit {

  shelfTitle:string;
  categories = [];

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.shelfTitle = this.storeService.store.shelfTitle;
    this.categories = this.storeService.categories;
  }

}

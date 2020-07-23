import { Component, OnInit } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class BillComponent implements OnInit {

  constructor(public storeService: StoreService) { }

  ngOnInit(): void {
  }

}

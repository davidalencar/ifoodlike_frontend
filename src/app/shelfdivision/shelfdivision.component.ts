import { Component, OnInit, Input } from '@angular/core';
import { StoreService } from '../store.service'


@Component({
  selector: 'app-shelfdivision',
  templateUrl: './shelfdivision.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class ShelfdivisionComponent implements OnInit {

  @Input() category = '';
  items = [];

  constructor(private storeService: StoreService) { }

  ngOnInit(): void {
    this.items = this.storeService.products.filter( p => p.category == this.category)
  }

}

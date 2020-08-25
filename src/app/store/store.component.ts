import { Component, OnInit } from '@angular/core';
import { DashBoardService } from '../services/dashboard.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';
import { map } from 'rxjs/operators';
import { StoreType } from '../services/types/store.type';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/remixicon/fonts/remixicon.css',
  './store.component.css']
})
export class StoreComponent implements OnInit {
  store: StoreType = new StoreType();
  storeName: string;
  categories: any[];
  

  constructor(private route: ActivatedRoute, public storeService: StoreService, public dashBoardService: DashBoardService) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((id: string) => {
      this.storeName = id;
      this.dashBoardService.getStoreData(id)
        .subscribe(data => {
          this.store = data.store;
        })
      
    });    
  }

  ngOnInit(): void {
  }

  delTaxe(taxe: string) {
    this.store.taxes = this.store.taxes.filter(t => t.name != taxe)
  }

  onAddTaxe(name: string, value: number) {
    if (name.trim().length < 3) return;
    if (value <= 0) return;
     
    this.store.taxes.push({name, value});
  }
}

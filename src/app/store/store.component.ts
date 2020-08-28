import { Component, OnInit } from '@angular/core';
import { DashBoardService } from '../services/dashboard.service';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from '../services/store.service';
import { map } from 'rxjs/operators';
import { StoreType } from '../services/types/store.type';
import { isObject } from 'lodash';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    '../../../node_modules/remixicon/fonts/remixicon.css',
    './store.component.css']
})
export class StoreComponent implements OnInit {
  commandNow = 'confirm';
  store: StoreType = new StoreType();
  storeCompare: StoreType = new StoreType();
  storeName: string;
  categories: any[];


  constructor(private route: ActivatedRoute, public storeService: StoreService, public dashBoardService: DashBoardService) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((id: string) => {
      this.storeName = id;
      this.dashBoardService.getStoreData(id)
        .subscribe(data => {
          this.store = data.store;
          this.storeCompare = JSON.parse(JSON.stringify(data.store));
        })

    });
  }

  ngOnInit(): void {
  }

  saveStore() {
    this.commandNow = 'spinner';
    this.dashBoardService.storeUpdate(this.store)
      .subscribe((saved: StoreType) => {
        this.commandNow = 'confirm';
        this.store = saved;
        this.storeCompare = JSON.parse(JSON.stringify(saved));
      })
  }

  delTaxe(taxe: string) {
    this.store.taxes = this.store.taxes.filter(t => t.name != taxe)
  }

  onAddTaxe(name: string, value: number) {
    if (name.trim().length < 3) return;
    if (value <= 0) return;

    this.store.taxes.push({ name, value });
  }

  canSave() {
    return this.deepEqual(this.store, this.storeCompare) == false;
  }

  deepEqual(object1, object2) {
    const keys1 = Object.keys(object1);
    const keys2 = Object.keys(object2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      const val1 = object1[key];
      const val2 = object2[key];
      const areObjects = isObject(val1) && isObject(val2);
      if (
        areObjects && !this.deepEqual(val1, val2) ||
        !areObjects && val1 !== val2
      ) {
        return false;
      }
    }

    return true;
  }
}

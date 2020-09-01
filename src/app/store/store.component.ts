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

  sectionsToShow: string[] = [];


  constructor(private route: ActivatedRoute, public storeService: StoreService, public dashBoardService: DashBoardService) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((id: string) => {
      this.storeName = id;
      this.dashBoardService.getStoreData(id)
        .subscribe(data => {
          this.store = data.store;     
          this.store.labels = this.store.labels.filter(l => l.name != 'novo cliente');     
          this.storeCompare = JSON.parse(JSON.stringify(data.store));
        })

    });
  }

  ngOnInit(): void {
  }

  saveStore() {
    this.commandNow = 'spinner';
    this.store.labels = this.store.labels.filter(l => l.name != 'novo cliente');
    this.dashBoardService.storeUpdate(this.store)
      .subscribe((saved: StoreType) => {
        this.commandNow = 'confirm';        
        this.store = saved;
        this.storeCompare = JSON.parse(JSON.stringify(saved));
      })
  }


  sortCategories() {
    return this.store.categories.sort((c1, c2) => {
      return c1.order - c2.order
    }).filter(c => c.enable == true)
  }

  orderCategory(plus: number, category:string) {    
    this.store.categories.find(c => c.name == category).order+= plus * 2;
    this.store.categories = this.sortCategories();
    for (let index = 0; index < this.store.categories.length; index++) {
      const element = this.store.categories[index].order = index;      
    }
    
  }

  delTaxe(taxe: string) {
    this.store.taxes = this.store.taxes.filter(t => t.name != taxe);
  }

  onAddTaxe(name: string, value: number) {
    if (name.trim().length < 3) return;
    if (value <= 0) return;

    this.store.taxes.push({ name, value });
  }

  onDelLabel(name: string) {
    this.store.labels = this.store.labels.filter(l => l.name != name);
  }

  onAddLabel(name: string) {
    if (name.trim().length < 0) return;
    
    this.store.labels.push({ name, color: this.getRandomColor() });
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  onAddCategory(name: string) {
    if (name.trim().length < 0) return;

    this.store.categories.push({
      name,
      enable: true,
      order: 1000
    });

    this.reOrderCategories();
  }

  reOrderCategories() {
    var newOrder = this.sortCategories();
    for (let index = 0; index < newOrder.length; index++) {
      newOrder[index].order = index;      
    }

    this.store.categories = newOrder;
  }

  delCategory(name: string) {
    this.store.categories = this.store.categories.filter(c => c.name != name)
    this.reOrderCategories()
  }

  canSave() {
    return this.dashBoardService.deepEqual(this.store, this.storeCompare) == false;
  }

  onShowSection(name: string) {
    if (this.sectionsToShow.includes(name)) {
      this.sectionsToShow = this.sectionsToShow.filter(s => s != name);
    } else {
      this.sectionsToShow.push(name);
    }
  }

  
}

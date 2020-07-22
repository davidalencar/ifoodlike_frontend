import { Component, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { Title }     from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.min.css',
   './app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private storeService: StoreService, private titleService: Title) {}

  storeName: string;
  storeComplement: string;
  
  ngOnInit(): void {
    this.storeName = this.storeService.store.name;
    this.storeComplement = this.storeService.store.complement;
    this.titleService.setTitle(this.storeService.store.name);
  }

}

import { Component, OnInit } from '@angular/core';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.min.css',
   './app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(public storeService: StoreService) {}
  ngOnInit() {}

}

import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-nav-back',
  templateUrl: './nav-back.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/remixicon/fonts/remixicon.css',
  './nav-back.component.css']
})
export class NavBackComponent implements OnInit {

  constructor() { }

  @Input() title :string; 
  @Input() route :string[]; 

  ngOnInit(): void {
  }

}

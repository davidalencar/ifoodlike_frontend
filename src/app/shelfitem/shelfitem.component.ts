import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shelfitem',
  templateUrl: './shelfitem.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class ShelfitemComponent implements OnInit {

  @Input() item: {name: string, unit: string, price: number,enable: boolean, category: string, img: string};

  qty: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  
  onSubtract()
  {
    if (this.qty > 0)
      this.qty-=1;
  }

  onAdd()
  {
    this.qty+=1;
  }
}

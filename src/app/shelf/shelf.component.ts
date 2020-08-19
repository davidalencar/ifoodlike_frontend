import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service'
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class ShelfComponent implements OnInit {

  constructor(private route: ActivatedRoute, public storeService: StoreService) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((id: string) => {
      if (!this.storeService.store.name)
        this.storeService.getStoreData(id);
    })
  }

  ngOnInit(): void {
  }

  nextRouterLink() {
    if (this.storeService.hasBasketProductsWithItems())
      return 'items'

    return 'bill'
  }

  nextRouterName() {
    if (this.storeService.hasBasketProductsWithItems())
      return 'Continuar'

    return 'Fechar pedido'
  }
}

import { Component, OnInit } from '@angular/core';
import { StoreService } from '../services/store.service'
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css', '../../../node_modules/bootstrap/dist/css/bootstrap.min.css']
})
export class ShelfComponent implements OnInit {
  routerId: string = '';

  constructor(private route: ActivatedRoute, public storeService: StoreService, private router: Router) {
    const id: Observable<string> = route.params.pipe(map(p => p.id));
    id.subscribe((id: string) => {
      if (!this.storeService.store.name)
        this.storeService.getStoreData(id);
    });
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const tree = router.parseUrl(router.url);
        if (tree.fragment) {
          this.routerId = tree.fragment;         
        }
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.routerId.length > 0) {
      this.goTo(this.routerId)
    }
  }

  goTo(id: string): void {
    if (id.length > 0) {
      const element = document.getElementById(id);
      if (element) { 
        element.scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"}); 
      }
    }
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

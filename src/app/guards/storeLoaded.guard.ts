import { CanActivate, ActivatedRouteSnapshot, Router } from "@angular/router";
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { StoreService } from '../services/store.service'

@Injectable({
    providedIn: 'root'
  })
export class StoreLoadedGuard implements CanActivate {
    constructor(private storeService: StoreService, private router: Router) {

    }

    canActivate(route: 	ActivatedRouteSnapshot) {
        if (this.storeService.store.name == undefined) {
            this.storeService.getStoreData(route.params['id']);
            this.router.navigate(['/',route.params['id']])
            //window.location.href = '/' + route.params['id'];
            return false;
        }
        return true
    }
}
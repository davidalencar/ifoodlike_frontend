import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { DashBoardService } from '../services/dashboard.service'

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {

    constructor(private dashBoardService: DashBoardService) { }

    canActivate() {
        if (this.dashBoardService.userToken.access_token == '') {
            window.location.href = '/';
            return false;
        }
        return true
    }
}
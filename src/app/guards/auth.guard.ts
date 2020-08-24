import { CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service'

@Injectable({
    providedIn: 'root'
  })
export class AuthGuard implements CanActivate {

    constructor(private userService: UserService) { }

    canActivate() {
        if (this.userService.userToken.access_token == '') {
            window.location.href = '/';
            return false;
        }
        return true
    }
}
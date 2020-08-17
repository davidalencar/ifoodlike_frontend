import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserType } from './types/user.type'

const apiUrl = 'https://fathomless-chamber-28156.herokuapp.com/api/users'


@Injectable()
export class UserService{
    constructor(private http: HttpClient) { }

    createUser(uname:string, uphone:string, uemail:string, plan: string): Observable<UserType> {
        const user = new UserType();
        user.name = uname;
        user.phone = uphone;
        user.email = uemail;
        user.password = 'firstpwd';
        user.plan = plan;
        return this.http.post<UserType>(apiUrl, user)
      }
}
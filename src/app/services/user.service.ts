import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'

import { UserType } from './types/user.type'


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
        return this.http.post<UserType>(`${environment.loja_api}/users`, user)
      }
}
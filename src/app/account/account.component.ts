import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { DashBoardService } from '../services/dashboard.service'
import { UserType } from '../services/types/user.type';
import { TokenType } from '../services/types/token.type';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  public currentView = 'login';
  public canSubmit = true;
  public newStore = '';

  public msgError: string = '';

  constructor(private route: ActivatedRoute,
    private router: Router,
    private titleService: Title,
    private dashBoardService: DashBoardService) {
    this.titleService.setTitle('BS.Lista - bslista.com');
    const token = this.dashBoardService.getToken();

    if(token != null && token != undefined && token.access_token != '') {
      this.router.navigate(['user/board']);
    }

  }

  ngOnInit(): void {
  }

  changeView(view: string) {
    this.currentView = view;
  }

  logIn(form: NgForm) {
    this.canSubmit = false;
    this.dashBoardService.login(form.value.userEmail, form.value.userPwd)
      .subscribe((token: TokenType) => {
        this.dashBoardService.setToken(token);               
        this.router.navigate(['user/board'])

      }, (e: any) => {
        if (e.status == 401) {
          this.canSubmit = true;
          this.msgError = 'Usuário ou senha inválida.';
        }
      })
  }

  signup(form: NgForm) {
    this.canSubmit = false;
    this.dashBoardService.createUser(form.value.userName,
      form.value.userPhone,
      form.value.userEmail,
      'test90',
      form.value.storeName)
      .subscribe(
        (data) => {
          if (data.status == 'OK') {
            this.newStore = 'bslista.com/' + form.value.storeName;
            this.currentView = 'welcome';
          } else {
            this.msgError = data.status;
            this.canSubmit = true;
          }

        },
        (e: any) => {
          this.canSubmit = true;
        });

  }
}

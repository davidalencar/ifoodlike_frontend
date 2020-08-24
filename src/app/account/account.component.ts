import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Title }     from '@angular/platform-browser';
import { NgForm } from '@angular/forms';
import { UserService } from '../services/user.service'
import { UserType } from '../services/types/user.type';
import { TokenType } from '../services/types/token.type';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  './account.component.css']
})
export class AccountComponent implements OnInit {

  public userPlan:string = '';
  public showMsg: boolean = false;
  public msg:string = '';

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private titleService: Title, 
    private userService: UserService) { 
    this.titleService.setTitle('BS.Lista - bslista.com')

    const id: Observable<string> = route.queryParams.pipe(map(p => p.plan));    
    id.subscribe((plan:string)=> {
      if (plan)
        this.userPlan = plan;
    })
  }

  ngOnInit(): void {
  }

  onSend(form: NgForm) {

    if (this.userPlan != ''){
      this.userService.createUser(form.value.userName,
        form.value.userPhone,
        form.value.userEmail,
        this.userPlan)
        .subscribe((data: UserType) => {          
        });
        this.showMsg = true;

    } else {
      this.userService.login(form.value.userEmail, form.value.userPwd)
        .subscribe((token: TokenType) => {
          this.userService.userToken = token;
          console.log(token)
          if (token.stores.length == 1){
            this.router.navigate([token.stores[0], 'sales'])
          } 
          this.router.navigate(['user/stores'])

        })
      
    }

    
  }
}

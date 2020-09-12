import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashBoardService } from '../services/dashboard.service';
import { UserType } from '../services/types/user.type';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/remixicon/fonts/remixicon.css',
  './changepwd.component.css']
})
export class ChangepwdComponent implements OnInit {

  constructor(private router: Router, public dashBoardService:  DashBoardService) { }

  errorMsg: string  = '';

  ngOnInit(): void {
  }

  onSave(newPwd:  string){
    this.dashBoardService.userChangePwd(newPwd)
      .subscribe((data:  {status: string, user: UserType}) => {

        if(data.status == 'OK'){
          this.errorMsg = 'senha alterada com sucesso'
          this.router.navigate(['user/board'])
        }

        this.errorMsg = data.status;
      })
  }
}

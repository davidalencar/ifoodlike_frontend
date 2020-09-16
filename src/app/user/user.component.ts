import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { DashBoardService } from '../services/dashboard.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/remixicon/fonts/remixicon.css',
  './user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router,
    public dashBoardService: DashBoardService,
    private titleService: Title) { 
      this.titleService.setTitle(this.dashBoardService.getToken().stores[0]);
    }
  

  ngOnInit(): void {
  }

  logOut(){
    this.dashBoardService.logout();
    this.router.navigate(['/']);
  }

}

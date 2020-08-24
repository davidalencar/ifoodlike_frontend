import { Component, OnInit } from '@angular/core';
import { DashBoardService } from '../services/dashboard.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/remixicon/fonts/remixicon.css',
  './user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public dashBoardService: DashBoardService) { }
  

  ngOnInit(): void {
  }

}

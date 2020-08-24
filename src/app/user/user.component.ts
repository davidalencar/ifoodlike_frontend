import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/remixicon/fonts/remixicon.css',
  './user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public userService: UserService) { }
  

  ngOnInit(): void {
  }

}

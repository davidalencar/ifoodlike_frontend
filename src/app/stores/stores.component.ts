import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/remixicon/fonts/remixicon.css',
  './stores.component.css']
})
export class StoresComponent implements OnInit {

  constructor(public userService: UserService) { }

  ngOnInit(): void {
  }

}

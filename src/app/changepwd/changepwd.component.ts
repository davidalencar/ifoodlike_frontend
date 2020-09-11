import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
  '../../../node_modules/remixicon/fonts/remixicon.css',
  './changepwd.component.css']
})
export class ChangepwdComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
  }

  onSave(){
    this.router.navigate(['user/board'])
  }
}

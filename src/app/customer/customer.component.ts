import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from '../services/store.service';
import { AddressService } from '../services/address.service';
import { AddressType } from '../services/types/address.type';
import { NgForm } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['../../../node_modules/bootstrap/dist/css/bootstrap.min.css',
    './customer.component.css',
    '../../../node_modules/remixicon/fonts/remixicon.css']
})
export class CustomerComponent implements OnInit {

  constructor(public storeService: StoreService,
    ) { }

  ngOnInit(): void {
  }

}

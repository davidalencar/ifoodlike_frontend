import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shelfdivision',
  templateUrl: './shelfdivision.component.html',
  styleUrls: ['./shelfdivision.component.css']
})
export class ShelfdivisionComponent implements OnInit {

  @Input() category = ''

  constructor() { }

  ngOnInit(): void {
    
  }

}

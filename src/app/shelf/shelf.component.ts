import { Component, OnInit } from '@angular/core';
import {StoryService} from '../story.service'

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.css']
})
export class ShelfComponent implements OnInit {

  categories = [];

  constructor(private storyService: StoryService) { }

  ngOnInit(): void {
    this.categories = this.storyService.categories;
  }

}

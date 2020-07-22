import { Component } from '@angular/core';
import { StoryService } from './story.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['../../node_modules/bootstrap/dist/css/bootstrap.min.css',
   './app.component.css']
})
export class AppComponent {
  
  constructor(private storyService: StoryService) {}

  title = 'loja';
}

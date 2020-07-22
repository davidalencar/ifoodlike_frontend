import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {StoryService} from './story.service'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShelfComponent } from './shelf/shelf.component';
import { ShelfdivisionComponent } from './shelfdivision/shelfdivision.component';
import { ShelfitemComponent } from './shelfitem/shelfitem.component';

@NgModule({
  declarations: [
    AppComponent,
    ShelfComponent,
    ShelfdivisionComponent,
    ShelfitemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [StoryService],
  bootstrap: [AppComponent]
})
export class AppModule { }

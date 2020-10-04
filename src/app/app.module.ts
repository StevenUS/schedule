import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DayComponent } from './day/day.component';
import {CalendarService} from './calendar.service';

@NgModule({
  declarations: [
    AppComponent,
    DayComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [CalendarService],
  bootstrap: [AppComponent]
})
export class AppModule { }

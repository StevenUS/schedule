import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DayComponent } from './day/day.component';
import {CalendarService} from './services/calendar.service';
import { ControlsComponent } from './controls/controls.component';

@NgModule({
    declarations: [
        AppComponent,
        DayComponent,
        ControlsComponent,
    ],
    imports: [
        BrowserModule
    ],
    providers: [CalendarService],
    bootstrap: [AppComponent]
})
export class AppModule { }

import { Component } from '@angular/core';
import {CalendarService} from './services/calendar.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'schedule';
    days = this.calendarService.days;

    constructor(private calendarService: CalendarService) {
    }
}

import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import {CalendarService} from '../services/calendar.service';

@Component({
    selector: 'app-controls',
    templateUrl: './controls.component.html',
    styleUrls: ['./controls.component.css']
})
export class ControlsComponent implements OnInit, AfterViewInit {

    @ViewChild('startHour') startHour: ElementRef;
    @ViewChild('endHour') endHour: ElementRef;
    @ViewChild('offset') offset: ElementRef;

    constructor(private calendarService: CalendarService) {

    }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.startHour.nativeElement.value = this.calendarService.dayConfig.getValue().startHour;
        this.endHour.nativeElement.value = this.calendarService.dayConfig.getValue().endHour;
        this.offset.nativeElement.value = this.calendarService.dayConfig.getValue().appointmentOffset;
    }

    setStartHour(event) {
        const dayConfig = this.calendarService.dayConfig.getValue();
        dayConfig.startHour = parseInt(event.target.value);
        this.calendarService.dayConfig.next(dayConfig);
    }

    setEndHour(event) {
        const dayConfig = this.calendarService.dayConfig.getValue();
        dayConfig.endHour = parseInt(event.target.value);
        this.calendarService.dayConfig.next(dayConfig);
    }

    setOffset(event) {
        const dayConfig = this.calendarService.dayConfig.getValue();
        dayConfig.appointmentOffset = parseInt(event.target.value);
        this.calendarService.dayConfig.next(dayConfig);
    }
}

import {Component, OnInit, Input, AfterViewInit, AfterViewChecked, DoCheck} from '@angular/core';
import {CalendarService} from '../services/calendar.service';
import {Day} from '../models/day';
import {Appointment} from '../models/appointment';
import {Interval} from './models/interval';
import {DayConfig} from '../models/day-config';

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit, AfterViewInit, AfterViewChecked, DoCheck {
    // day as an input for convenience,
    // data should be retrieved from a service by a key (date)
    @Input() day: Day;

    appointments: Appointment[];

    // store the graphical offset of each appointment
    // key: appt id, val: offset
    appointmentOffsets = {};

    startCal: number;
    endCal: number;

    startShift: number;
    endShift: number;

    intervals: Interval[] = [];

    private performanceStart: number;

    maxAppointmentDepth: number = 1;

    constructor(private calendarService: CalendarService) {
    }

    ngOnInit() {
        // console.log(this.day);

        this.performanceStart = performance.now();

        this.calendarService.dayConfig.asObservable().subscribe((dayConfig: DayConfig) => {
            // this.performanceStart = performance.now();
            this.startCal = dayConfig.startHour;
            this.endCal = dayConfig.endHour;
            if (this.appointments) {
                this.buildIntervals();
                // console.log(`rebuild day in: ${performance.now() - this.performanceStart}`)
            }
        });

        // get a copy
        this.appointments = this.day.appointments.map((a: Appointment) => {return {...a} as Appointment;});

        for (let a of this.appointments) {
            this.appointmentOffsets[a.id] = 0;
        }

        this.startShift = this.day.start;
        this.endShift = this.day.end;

        this.buildIntervals();

    }

    ngAfterViewInit() {
        console.log(`day rendered in: ${performance.now() - this.performanceStart}ms`);
        this.performanceStart = null;
    }

    ngDoCheck() {
        this.performanceStart = performance.now();
    }

    ngAfterViewChecked() {
        if (this.performanceStart) {
            console.log(`re-rendered in: ${performance.now() - this.performanceStart}ms`);
        }
    }

    private buildIntervals() {
        this.intervals = [];

        // store quote offsets by id
        for (let hour = this.startCal; hour < this.endCal; hour++) {

            const interval: Interval = {hour: hour, appointmentSections: []};

            for (let i = 0; i < this.appointments.length; i++) {

                const appointment = this.appointments[i];
                if (appointment.start <= hour && appointment.end >= hour) {

                    const offset = this.appointmentOffsets[appointment.id];
                    const curMaxOffset = Math.max(offset, interval.appointmentSections.length)
                    this.appointmentOffsets[appointment.id] = curMaxOffset;
                    this.maxAppointmentDepth = Math.max(this.maxAppointmentDepth, curMaxOffset + 1);

                    interval.appointmentSections.push({
                        id: appointment.id,
                        start: interval.hour === appointment.start,
                        end: interval.hour === appointment.end
                    });
                }
            }

            this.intervals.push(interval);
        }
    }

    getParentHeight() {
        return Math.max(
            this.calendarService.dayConfig.getValue().appointmentOffset * this.maxAppointmentDepth * 1.75,
            60
        );
    }

    getOffset(id: number): number {
        return this.appointmentOffsets[id] + 1;
    }

    isOnShift(hour: number): boolean {
        return hour >= this.startShift && hour <= this.endShift;
    }

    getConfiguredOffset() {
        // console.log(this.calendarService.dayConfig.getValue())
        return this.calendarService.dayConfig.getValue().appointmentOffset;
    }

}


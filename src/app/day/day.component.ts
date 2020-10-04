import {Component, OnInit, Input} from '@angular/core';
import {CalendarService} from '../services/calendar.service';
import {Day} from '../models/day';
import {Appointment} from '../models/appointment';
import {Interval} from './models/interval';

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
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

    constructor(private calendarService: CalendarService) {
        this.startCal = this.calendarService.dayConfig.startHour;
        this.endCal = this.calendarService.dayConfig.endHour;
    }

    ngOnInit() {
        console.log(this.day);

        // get a copy
        this.appointments = this.day.appointments.map((a: Appointment) => {return {...a} as Appointment;});

        for (let a of this.appointments) {
            this.appointmentOffsets[a.id] = 0;
        }

        this.startShift = this.day.start;
        this.endShift = this.day.end;

        this.buildIntervals();
    }

    private buildIntervals() {
        // store quote offsets by id
        for (let hour = this.startCal; hour < this.endCal; hour++) {

            const interval: Interval = {hour: hour, appointmentSections: []};

            for (let i = 0; i < this.appointments.length; i++) {

                const appointment = this.appointments[i];
                if (appointment.start <= hour && appointment.end >= hour) {

                    const offset = this.appointmentOffsets[appointment.id];
                    this.appointmentOffsets[appointment.id] = Math.max(offset, interval.appointmentSections.length);

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

    getOffset(id: number): number {
        return this.appointmentOffsets[id] + 1;
    }

    isOnShift(hour: number): boolean {
        return hour >= this.startShift && hour <= this.endShift;
    }

}


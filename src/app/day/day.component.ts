import {Component, OnInit, Input} from '@angular/core';
import {CalendarService} from '../services/calendar.service';
import {Day} from '../models/day';
import {Appointment} from '../models/appointment';

@Component({
    selector: 'app-day',
    templateUrl: './day.component.html',
    styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
    @Input() day: Day;
    // refrence to appointment, and reference to offset based on if 
    // it overlaps with other appointments on schedule
    appointments: any[];
    startCal: number;
    endCal: number;
    intervals = [];

    constructor(private calendarService: CalendarService) {
        this.startCal = this.calendarService.dayConfig.startHour;
        this.endCal = this.calendarService.dayConfig.endHour;
    }

    ngOnInit() {
        console.log(this.day);

        // don't mutate
        // offset of the appointment is added to the appointment object
        this.appointments = this.day.appointments.map((a: Appointment) => new Object({...a, offset: 0}));
        this.buildIntervals();
    }

    buildIntervals() {
        for (let hour = this.startCal; hour < this.endCal; hour++) {

            const interval: Interval = {hour: hour, appointmentSections: []};

            for (let i = 0; i < this.appointments.length; i++) {

                const appointment = this.appointments[i];
                if (appointment.start <= hour && appointment.end >= hour) {
                    appointment.offset = Math.max(appointment.offset, interval.appointmentSections.length);

                    interval.appointmentSections.push({
                        id: appointment.id,
                        offset: appointment.offset,
                        start: interval.hour === appointment.start,
                        end: interval.hour === appointment.end
                    });
                }
            }

            this.intervals.push(interval);
        }
    }

}

interface AppointmentSection {
    id: number;
    offset: number; // offsets the appointment
    start: boolean; // is first block of appointment
    end: boolean;  // is last block of appointment
}

interface Interval {
    hour: number;
    appointmentSections: AppointmentSection[];
}

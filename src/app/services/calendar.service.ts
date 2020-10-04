import {Injectable} from "@angular/core";
import {Day} from "../models/day";
import {BehaviorSubject} from 'rxjs';
import {DayConfig} from '../models/day-config';

@Injectable()
export class CalendarService {
    days: Day[];
    dayConfig: BehaviorSubject<DayConfig> = new BehaviorSubject({} as DayConfig);

    totalDaysInView: number = 14;

    workHours = {start: 8, end: 19};

    constructor() {
        this.days = this.generateDays();

        if (false) {
            this.generateRandomAppointments(20); 
        } else {
            this.generateAppointmentsPerDay();
        }


        this.dayConfig.next(
            {
                startHour: 6,
                endHour: 23,
                appointmentOffset: 20
            }
        );

        console.log(this.days);
    }

    private generateRandomAppointments(qty: number) {
        for (let i = 0; i < qty; i++) {
            this.mockAppointment(this.getMockAppointmentId());
        }
    }

    private generateAppointmentsPerDay() {
        let id = 1;
        // create mock appointments
        for (const day of this.days) {
            // up to 5 appointments a day
            const qtyOfAppointments = this.getRandom(0, 5);
            for (let i = 0; i < qtyOfAppointments; i++) {
                let appointment = this.mockAppointment(id);
                id++;
                day.appointments.push(appointment);
            }
        }
    }

    private generateDays() {
        const days = [];
        for (let i = 0; i < this.totalDaysInView; i++) {
            const date = new Date();
            date.setDate(date.getDate() + i);

            days.push(
                {
                    date: date,
                    start: this.workHours.start,
                    end: this.workHours.end,
                    appointments: []
                } as Day
            );
        }
        return days;
    }

    getMockAppointmentId(): number {
        const ids = this.days.reduce((acc: any, d: any) => {
            for (const a of d.appointments) {
                acc.push(a.id);
            }
            return acc;
        }, []);
        return ids.length > 0 ? ids.sort().pop() + 1 : 1;
    }


    mockAppointment(id: number) {
        const max_job_len = 4;
        const startTime = this.getRandom(this.workHours.start, this.workHours.end - 1);
        const endTime = this.getRandom(startTime + 1, startTime + max_job_len);
        return {
            id: id,
            start: startTime,
            end: endTime
        };
    }

    // adds appointment to day
    mockAppointmentWithRandomDate(id: number) {
        const now = new Date();
        const min = now.getDay();
        const max = now.getDay() + this.totalDaysInView;
        const andvanceDays = now.getDay() + this.getRandom(min, max);
        const randomDate = new Date();
        randomDate.setDate(randomDate.getDate() + andvanceDays);
        const day = this.days.find(d => d.date.getDay() === randomDate.getDay() && d.date.getMonth() === randomDate.getMonth());

        const max_job_len = 4;
        const startTime = this.getRandom(this.workHours.start, this.workHours.end - 1);
        const endTime = this.getRandom(startTime + 1, startTime + max_job_len);
        day.appointments.push(
            {
                id: id,
                start: startTime,
                end: endTime
            }
        );
    }

    private getRandom(min: number, max: number):number {
        return Math.floor(Math.random() * (max - min) + min);
    }
}


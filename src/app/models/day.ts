import {Appointment} from './appointment';

export interface Day {
    date: Date;
    start: number;
    end: number;
    appointments: Appointment[];
}

import { Injectable } from "@angular/core";
import {Day} from "../models/day";

@Injectable()
export class CalendarService {
    days: Day[];
    dayConfig = {
        startHour: 6,
        endHour: 20
    };

    constructor() {
        this.days = CalendarService.generateDays();
    }

    private static generateDays() {
        return [
            {
                date: new Date(),
                start: 8,
                end: 21,
                appointments: [
                    {id: 1, start: 17, end: 19},
                    {id: 2, start: 8, end: 9},
                    {id: 3, start: 11, end: 13},
                    {id: 4, start: 12, end: 15}
                ]
            }
        ];
    }
}


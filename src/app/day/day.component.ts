import { Component, OnInit, Input } from '@angular/core';
import {CalendarService} from '../calendar.service';

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
    @Input() day;
    quotes;
    startCal;
    endCal;
    intervals = [];

    constructor(private calendarService: CalendarService) {
        this.startCal = this.calendarService.dayConfig.startHour;
        this.endCal = this.calendarService.dayConfig.endHour;
    }

    ngOnInit() {
        console.log(this.day);

        // don't mutate
        // offset of the quote is added to the quote object
        this.quotes = this.day.quotes.map(q => new Object({...q, offset: 0}));
        this.buildIntervals();
    }

    buildIntervals() {
        for (let hour = this.startCal; hour < this.endCal; hour++) {

            const interval = {hour: hour, quoteSections: []};

            for (let i = 0; i < this.quotes.length; i++) {

                const quote = this.quotes[i];

                if (this._quoteInHour(hour, quote)) { 
                    quote.offset = Math.max(quote.offset, interval.quoteSections.length)
                    interval.quoteSections.push({
                        id: quote.id,
                        offset: quote.offset,
                        start: interval.hour === quote.start,
                        end: interval.hour === quote.end
                    })
                }

            }

            this.intervals.push(interval);

        }
    }

    _quoteInHour(hour: number, quote) {
        return quote.start <= hour && quote.end >= hour;
    }

}

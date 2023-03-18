import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';

import {BehaviorSubject, Observable} from 'rxjs';

import {EventRef} from 'app/main/apps/calendar/calendar.model';
import {environment} from '../../../../environments/environment';
import {TimesTablesService} from '../../pages/establishment/services/times_table.service';

@Injectable()
export class CalendarService implements Resolve<any> {
    // Public
    public events;
    public calendar;
    public currentEvent;
    public tempEvents;

    public onEventChange: BehaviorSubject<any>;
    public onCurrentEventChange: BehaviorSubject<any>;
    public onCalendarChange: BehaviorSubject<any>;


    constructor(private _httpClient: HttpClient, private _timeTableService: TimesTablesService) {
        this.onEventChange = new BehaviorSubject({});
        this.onCurrentEventChange = new BehaviorSubject({});
        this.onCalendarChange = new BehaviorSubject({});
    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {
            Promise.all([this.getEvents(), this.getCalendar()]).then(res => {
                resolve(res);
            }, reject);
        });
    }

    /**
     * Get Events
     */
    getEvents(): Promise<any[]> {
        const url = `api/calendar-events`;

        return new Promise((resolve, reject) => {
            this._httpClient.get(url).subscribe((response: any) => {
                this.events = response;
                this.tempEvents = response;
                this.onEventChange.next(this.events);
                resolve(this.events);
            }, reject);
        });
    }

    /**
     * Get Calendar
     */
    getCalendar(): Promise<any[]> {
        const url = `api/calendar-filter`;

        return new Promise((resolve, reject) => {
            this._httpClient.get(url).subscribe((response: any) => {
                this.calendar = response;
                this.onCalendarChange.next(this.calendar);
                resolve(this.calendar);
            }, reject);
        });
    }

    /**
     * Create New Event
     */
    createNewEvent() {
        this.currentEvent = {};
        this.onCurrentEventChange.next(this.currentEvent);
    }


    calendarUpdate(calendars) {
        const calendarsChecked = calendars.filter(calendar => {
            return calendar.checked === true;
        });

        const calendarRef = [];
        calendarsChecked.map(res => {
            calendarRef.push(res.filter);
        });

        this.events = this.tempEvents.filter(event => calendarRef.includes(event.calendar));
        this.onEventChange.next(this.events);
    }


    deleteEvent(event) {
        return new Promise((resolve, reject) => {
            this._httpClient.delete('api/calendar-events/' + event.id).subscribe(response => {
                this.getEvents();
                resolve(response);
            }, reject);
        });
    }


    addEvent(eventForm) {
        const newEvent = new EventRef();
        newEvent.url = eventForm.url;
        newEvent.title = eventForm.title;
        newEvent.start = eventForm.start;
        newEvent.end = eventForm.end;
        newEvent.classRoomId = eventForm.classRoomId;
        newEvent.courseId = eventForm.courseId;
        newEvent.professorId = eventForm.professorId;
        newEvent.isRepead = eventForm.isRepead;
        newEvent.allDay = eventForm.allDay;
        newEvent.calendar = eventForm.selectlabel;
        newEvent.extendedProps.location = eventForm.location;
        newEvent.extendedProps.description = eventForm.description;
        newEvent.extendedProps.addGuest = eventForm.addGuest;
        this.currentEvent = newEvent;
        this.onCurrentEventChange.next(this.currentEvent);
        this.postNewEvent();
    }

    updateCurrentEvent(eventRef) {
        const newEvent = new EventRef();
        newEvent.allDay = eventRef.event.allDay;
        newEvent.id = parseInt(eventRef.event.id);
        newEvent.url = eventRef.event.url;
        newEvent.title = eventRef.event.title;
        newEvent.start = eventRef.event.start;
        newEvent.end = eventRef.event.end;
        newEvent.professorId = eventRef.professorId;
        newEvent.calendar = eventRef.event.extendedProps.calendar;
        newEvent.extendedProps.location = eventRef.event.extendedProps.location;
        newEvent.extendedProps.description = eventRef.event.extendedProps.description;
        newEvent.extendedProps.addGuest = eventRef.event.extendedProps.addGuest;
        this.currentEvent = newEvent;
        this.onCurrentEventChange.next(this.currentEvent);
    }

    /**
     * Post New Event
     */
    postNewEvent() {
        return new Promise((resolve, reject) => {
            let data = {
                'start': this.currentEvent.start,
                'end': this.currentEvent.end,
                'class_level_has_course_id': this.currentEvent.courseId,
                'school_has_professor_id': this.currentEvent.professorId,
                'class_room_id': this.currentEvent.classRoomId,
                'class_level_id' : this.classLevelId,
                'times_table_id' => 'required'
            }
            this._timeTableService.create(data).subscribe(response => {
                this.getEvents();
                resolve(response);
            }, reject);
        });
    }


    postUpdatedEvent(event) {
        return new Promise((resolve, reject) => {
            this._httpClient.post('api/calendar-events/' + event.id, {...event}).subscribe(response => {
                this.getEvents();
                resolve(response);
            }, reject);
        });
    }
}

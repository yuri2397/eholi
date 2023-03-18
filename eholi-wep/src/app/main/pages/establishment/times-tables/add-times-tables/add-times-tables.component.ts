import {AfterViewInit, Component, OnInit, ViewEncapsulation} from '@angular/core';
import {CalendarOptions, EventAddArg, EventChangeArg, EventClickArg, EventRemoveArg} from '@fullcalendar/angular';
import {ActivatedRoute} from '@angular/router';
import {TimesTable} from '../../models/times_table.model';
@Component({
    selector: 'app-add-times-tables',
    templateUrl: './add-times-tables.component.html',
    styleUrls: ['./add-times-tables.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class AddTimesTablesComponent implements OnInit, AfterViewInit {
    timesTable: TimesTable;

    public events = [
    ];
    calendarOptions: CalendarOptions = {
        headerToolbar: {
            start: 'sidebarToggle, prev,next, title',
            end: null
        },
        initialView: 'timeGridWeek',
        initialEvents: this.events,
        weekends: false,
        editable: true,
        weekNumbers: true,
        weekNumberCalculation: 'ISO',
        eventResizableFromStart: true,
        selectable: false,
        selectMirror: true,
        dayMaxEvents: 2,
        navLinks: false,
        locale: 'fr',
        locales: [{code: 'fr'}],
        eventAdd: this.handleEventAdd.bind(this),
        eventChange: this.handleEventChange.bind(this),
        eventRemove: this.handleEventRemove.bind(this),
        eventClick: this.handleUpdateEventClick.bind(this),
        eventClassNames: this.eventClass.bind(this),
        select: this.handleDateSelect.bind(this)
    };
     handleEventRemove(arg:  EventRemoveArg) {
        console.log('handleEventRemove', arg.event);
    }

    handleEventAdd(arg: EventAddArg) {
        console.log('handleEventAdd', arg.event);
    }

    handleEventChange(arg:  EventChangeArg) {
        console.log('handleEventChange', arg.event);
    }


    handleUpdateEventClick(eventRef: EventClickArg) {
      console.log(eventRef.event._def);
    }

    toggleSidebar(name): void {
        console.log('toggleSidebar', name);
    }

    handleDateSelect(eventRef) {
        console.log(eventRef);
    }

    eventClass(s) {
        const calendarsColor = {
            Business: 'primary',
            Holiday: 'success',
            Personal: 'danger',
            Family: 'warning',
            ETC: 'info'
        };

        const colorName = calendarsColor[s.event._def.extendedProps.calendar];
        return `bg-light-${colorName}`;
    }
    constructor(private _route: ActivatedRoute) {
    }

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
         this._route.data.subscribe((data) => {
            this.timesTable = data.data;
            console.log(this.timesTable);
         });
    }

}

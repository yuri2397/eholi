import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';

import {CoreSidebarService} from '@core/components/core-sidebar/core-sidebar.service';

import {EventRef} from 'app/main/apps/calendar/calendar.model';
import {CalendarService} from 'app/main/apps/calendar/calendar.service';
import {ProfessorsService} from '../../../../pages/professors/professors.service';
import {CourseService} from '../../../../pages/establishment/services/course.service';
import {Professor} from '../../../../pages/professors/professor';
import {ActivatedRoute} from '@angular/router';
import {first} from 'rxjs/operators';
import {Course} from '../../../../pages/establishment/models/course.model';
import {ClassRoomService} from '../../../../pages/establishment/services/class-room.service';
import {ClassRoom} from '../../../../pages/establishment/models/class-room.model';
import {ClassLevelCourseService} from '../../../../pages/establishment/services/class-level-courses.service';

@Component({
    selector: 'app-calendar-event-sidebar',
    templateUrl: './calendar-event-sidebar.component.html',
    encapsulation: ViewEncapsulation.None
})
export class CalendarEventSidebarComponent implements OnInit {
    //  Decorator
    @ViewChild('startDatePicker') startDatePicker;
    @ViewChild('endDatePicker') endDatePicker;

    // Public
    public event: EventRef;
    public isDataEmpty;
    public selectLabel: Course[] = [];
    classRooms: ClassRoom[] = [];
    public selectGuest: any[] = [
    ];
    public startDateOptions = {
        altInput: true,
        mode: 'single',
        altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
        enableTime: true
    };
    public endDateOptions = {
        altInput: true,
        mode: 'single',
        altInputClass: 'form-control flat-picker flatpickr-input invoice-edit-input',
        enableTime: true
    };

    classLevelId: string;
    private selectClassLevelId: any;
    private timesTableId: any;

    constructor(
        private _classRoomServices: ClassRoomService,
        private _route: ActivatedRoute,
        private _coreSidebarService: CoreSidebarService,
        private _calendarService: CalendarService,
        private _professorService: ProfessorsService,
        private _courseService: ClassLevelCourseService) {}


    /**
     * Toggle Event Sidebar
     */
    toggleEventSidebar() {
        this._coreSidebarService.getSidebarRegistry('calendar-event-sidebar').toggleOpen();
    }


    addEvent(eventForm) {
        if (eventForm.valid) {
            eventForm.form.value.start = this.startDatePicker.flatpickrElement.nativeElement.children[0].value;
            eventForm.form.value.end = this.endDatePicker.flatpickrElement.nativeElement.children[0].value;
            console.log(eventForm.form.value);
            eventForm.form.value['classLevelId'] = this.selectClassLevelId;
            eventForm.form.value['timesTableId'] = this.timesTableId;
            this._calendarService.addEvent(eventForm.form.value);
            //this.toggleEventSidebar();
        }
    }

    /**
     * Update Event
     */
    updateEvent() {
        console.log(this.event);
        this.toggleEventSidebar();
        this.event.start = this.startDatePicker.flatpickrElement.nativeElement.children[0].value;
        this.event.end = this.endDatePicker.flatpickrElement.nativeElement.children[0].value;
        this._calendarService.postUpdatedEvent(this.event);
    }

    /**
     * Delete Event
     */
    deleteEvent() {
        this._calendarService.deleteEvent(this.event);
        this.toggleEventSidebar();
    }

    // Lifecycle Hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Subscribe to current event changes
        this._calendarService.onCurrentEventChange.subscribe(response => {
            this.event = response;

            // If Event is available
            if (Object.keys(response).length > 0) {
                this.event = response;
                this.isDataEmpty = false;
                if (response.id === undefined) {
                    this.isDataEmpty = true;
                }
            }
            else {
                this.event = new EventRef();

                // Clear Flatpicker Values
                setTimeout(() => {
                    this.startDatePicker.flatpickr.clear();
                    this.endDatePicker.flatpickr.clear();
                });
                this.isDataEmpty = true;
            }
        });

        this._professorService.index<Professor>().subscribe({
            next: response => {

                this.selectGuest = response.data?.map((professor: Professor) => {
                    return {
                        'name': `${professor.first_name} ${professor.last_name}`,
                        'professor_id': professor.id
                    };
                });
            },
            error: errors => {
                console.log('erros', errors)
                ;
            }
        });
        this._route.params.subscribe((data) => this.timesTableId = data['id']);
        this._route.queryParams.subscribe(data => {
            console.log(data);
            this.selectClassLevelId = data['class_level'];
            this._courseService.index<Course>({
                'filter[class_level_id]': data['class_level'],
                'with[]': 'course'
            }).pipe(first()).subscribe({
                next: (response: any) => {
                    this.selectLabel = response;
                },
                error: (errors: any) => {
                    console.log(errors);
                }
            });
        });

        this._classRoomServices.index<ClassRoom>().subscribe({
            next: response => {
                console.log(response);
                this.classRooms = response.data;
            },
            error: errors => {
                console.log(errors);
            }
        });

    }
}

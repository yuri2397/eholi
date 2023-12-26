import {Component, Input, OnInit} from '@angular/core';
import {ClassLevel} from '../../models/class-level.model';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Level} from '../../models/level.model';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {Course} from '../../models/course.model';
import {ClassRoom} from '../../models/class-room.model';
import {ClassRoomService} from '../../services/class-room.service';
import {ActivatedRoute} from '@angular/router';
import {ClassLevelCourseService} from '../../services/class-level-courses.service';
import {TimesTable} from '../../models/times_table.model';
import {finalize, first} from 'rxjs/operators';
import {ClassLevelCourse} from '../../models/class-level-course.model';
import {TimesTablesService} from '../../services/times_table.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { ProfessorsService } from 'app/main/pages/professors/professors.service';
const DAYS = [
    {id: 1, name: 'الأحد'},
    {id: 2, name: 'الاثنين'},
    {id: 3, name: 'الثلاثاء'},
    {id: 4, name: 'الأربعاء'},
    {id: 5, name: 'الخميس'},
    {id: 6, name: 'الجمعة'},
    {id: 7, name: 'السبت'},
];
@Component({
    selector: 'app-update-times-tables',
    templateUrl: './update-times-tables.component.html',
    styleUrls: ['./update-times-tables.component.scss']
})
export class UpdateTimesTablesComponent implements OnInit {
    @Input() modal: any;
    @Input() currentTimesTable: TimesTable;
    @Input() tem: ClassLevel;

    form: FormGroup;
    selectLoading = false;
    createdLoad = false;
    levels: Level[];
    days = DAYS;

    public selectLabel: ClassLevelCourse[] = [];
    classRooms: ClassRoom[] = [];
    public selectGuest: any[] = [];
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

    constructor(
        private _classRoomServices: ClassRoomService,
        private _route: ActivatedRoute,
        private _coreSidebarService: CoreSidebarService,
        private _timesTablesService: TimesTablesService,
        private _toastrService: ToastrService,
        private _translateService: TranslateService,
        private _professorService: ProfessorsService,
        private _fb: FormBuilder,
        private _courseService: ClassLevelCourseService) {
    }

    get start() {
        return this.form.get('start');
    }

    get end() {
        return this.form.get('end');
    }

    get is_repeated() {
        return this.form.get('is_repeated');
    }

    get class_room_id() {
        return this.form.get('class_room_id');
    }

    get class_level_has_course_id() {
        return this.form.get('class_level_has_course_id');
    }

    get day_number() {
        return this.form.get('day_number');
    }


    ngOnInit(): void {
        this.form = this._fb.group({
            all_day: new FormControl(false, []),
            start: new FormControl(null, [Validators.required]),
            end: new FormControl(null, [Validators.required]),
            is_repeated: new FormControl(true, [Validators.required]),
            class_room_id: new FormControl(null, []),
            times_table_id: new FormControl(this.currentTimesTable?.id, [Validators.required]),
            class_level_has_course_id: new FormControl(null, [Validators.required]),
            professor_id: new FormControl(null, [Validators.required]),
            day_number: new FormControl(null, [Validators.required]),
        });

        this._route.queryParams.subscribe(data => {
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

    submit(value: any) {
        console.log(value);
        this.createdLoad = true;
        this._timesTablesService.create(value).pipe(finalize(() => this.createdLoad = false)).subscribe({
            next: (response: any) => {
                console.log(response);
                this._toastrService.success(
                    this._translateService.instant(
                        'times_tables.create.message.success',
                    ),
                    this._translateService.instant('content.notifications.title'),
                );
                this.modal.close(response);
            },
            error: (errors: any) => {
                console.log(errors);
                this._toastrService.error(
                    this._translateService.instant('times_tables.create.message.error'),
                    this._translateService.instant('content.notifications.title'),
                );
            }
        });
    }

    onCourseChange(data: any) {
        if (data) {
            const course = this.selectLabel.find((item: any) => item.id === data);
            console.log(course);
            this.form.patchValue({
                professor_id: course?.professor_id
            });
        }
    }
}

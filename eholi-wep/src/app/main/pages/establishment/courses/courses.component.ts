import {ClassLevelCourse} from './../models/class-level-course.model';
import {CourseService} from './../services/course.service';
import {ClassLevel} from './../models/class-level.model';
import {first, finalize} from 'rxjs/operators';
import {ClassLevelService} from './../services/class-level.service';
import {Paginate} from 'app/auth/models/base.model';
import {ActivatedRoute, Router} from '@angular/router';
import {
    Component,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {ClassRoom, Course} from '../establishment.model';
import {Param} from 'app/auth/models/data.model';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal, NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {Subject} from 'rxjs';
import {ClassLevelCourseService} from '../services/class-level-courses.service';

@Component({
    selector: 'app-courses',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CoursesComponent implements OnInit {
    @Input() classLevelId: string;
    courses: Paginate<Course>;
    public contentHeader!: any;
    public queryParams: Param = {};
    public basicSelectedOption = 5;
    searchTimeout: NodeJS.Timeout;
    editingClassRoom!: Course;
    deletedRow!: Course;
    load = true;
    selectedRow: ClassLevelCourse;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _translateService: TranslateService,
        private _modalService: NgbModal,
        private _classLevelCourseService: ClassLevelCourseService
    ) {
    }

    // MODAL
    openCreateModal(modal: any) {
        this._modalService
            .open(modal, {
                centered: true,
                windowClass: 'modal modal-primary',
                size: 'lg',
                keyboard: false,
            })
            .result.then((result) => {
            console.log(result);
            if (result) {
                this._router.navigate([], { relativeTo: this._route, queryParams: this._route.queryParams, queryParamsHandling: 'merge' })
            }
        })
            .catch((_) => {
            });
    }

    paginate = (page?: {
        count: number;
        limit: number;
        offset: number;
        pageSize: number;
    }) => {
        if (page) {
            this.queryParams.per_page = page.pageSize;
            this.queryParams.page = page.offset + 1;
        }
        console.log(this.queryParams);

        this._router.navigate(['./'], {
            queryParams: this.queryParams,
            relativeTo: this._route,
            replaceUrl: true,
        });
    }

    onSearch(_: string) {
        if (this.searchTimeout) {
            clearTimeout(this.searchTimeout);
        }
        this.searchTimeout = setTimeout(() => {
            this.paginate();
        }, 500);
    }

    ngOnInit(): void {
        if (!this.classLevelId) {
            this._route.data.subscribe((data: { courses: Paginate<Course> }) => {
                this.courses = data.courses;
                console.log(this.courses);
            });

            // get the queryParams
            this._route.queryParams.subscribe((data) => {
                this.queryParams = JSON.parse(JSON.stringify(data));
            });
            this.load = false;
        } else {
            this.fetchData({
                'filter[class_level_id]': this.classLevelId,
                'filter[prenom]': 11,
                'filter[test]': 11,
                per_page: 15,
                page: 1,
                'with[]': ['class_level', 'course', 'semester', 'professor'],
            });
        }

        this._translateService
            .get('content.title.courses')
            .subscribe((title: string) => {
                this.contentHeader = {
                    headerTitle: title,
                    actionButton: false,
                };
            });
    }

    fetchData(filter: any) {
        this._classLevelCourseService
            .index<Course>(filter)
            .pipe(
                first(),
                finalize(() => (this.load = false))
            )
            .subscribe({
                next: (response) => {
                    console.log('FETCH ', response);
                    this.courses = response;
                },
                error: (error) => {
                    console.log('ERROR ', error);
                },
            });
    }

    openEditModal(modal: any, row: ClassLevelCourse) {
        this.selectedRow = row;
        this._modalService
            .open(modal, {
                centered: true,
            })
            .result.then((result) => {
            if (result) {
                const index = this.courses.data.findIndex(
                    (item) => item.id === result.id
                );
                this.courses.data[index] = result;
                this.courses.data = [...this.courses.data];
            }
        })
            .catch((_) => {
            });
    }
}

import {Student} from '../../../student/student.model';
import {Paginate} from '../../../../../auth/models/base.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ClassLevel} from '../../models/class-level.model';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {Param} from 'app/auth/models/data.model';
import {TranslateService} from '@ngx-translate/core';
import {Course} from '../../establishment.model';

@Component({
    selector: 'app-show-class-level',
    templateUrl: './show-class-level.component.html',
    styleUrls: ['./show-class-level.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ShowClassLevelComponent implements OnInit {
    class_level: ClassLevel;
    queryParams: Param = {};
    contentHeader0: any;
    contentHeader1: any;
    contentHeader2: any;
    contentHeader3: any;
    students: Paginate<Student>;
    courses: Paginate<Course>;
    private times_table: any;

    constructor(
        private _route: ActivatedRoute,
        private _translateService: TranslateService,
        private _router: Router,
    ) {
    }

    onSearch(data: string) {
    }

    paginate = (page?: {
        count: number
        limit: number
        offset: number
        pageSize: number
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

    openAddCourseModal(modal: any) {

    }

    onCourseSearch(data: any) {

    }

    paginateCourse(page?: any) {

    }

    ngOnInit(): void {
        this._route.data.subscribe(
            (data: { class_level: ClassLevel; students: Paginate<Student> }) => {
                console.log(data.class_level);
                this.class_level = data.class_level;
                this.students = data.students;
                this.times_table = data.class_level?.times_table;
                this.contentHeader0 = {
                    headerTitle: this.class_level.name,
                    actionButton: false,
                };
            },
        );

        // get the queryParams
        this._route.queryParams.subscribe((data) => {
            this.queryParams = JSON.parse(JSON.stringify(data));
        });

        // transaltion service
        this._translateService
            .get(['content.title.students', 'content.title.courses', 'content.title.timestable'])
            .subscribe((title: string[]) => {
                this.contentHeader1 = {
                    headerTitle: title['content.title.courses'],
                    actionButton: false,
                    breadcrumb: {
                        type: '',
                        links: [
                            {
                                name: this._translateService.instant('content.title.list'),
                                isLink: false,
                            },
                        ],
                    },
                };
                this.contentHeader2 = {
                    headerTitle: title['content.title.timestable'],
                    actionButton: false,
                    breadcrumb: {
                        type: '',
                        links: [
                            {
                                name: this._translateService.instant('content.title.list'),
                                isLink: false,
                            },
                        ],
                    },
                };
            });
    }
}

import { Student } from './../../../student/student.model'
import { Paginate } from './../../../../../auth/models/base.model'
import { ActivatedRoute, Router } from '@angular/router'
import { ClassLevel } from './../../models/class-level.model'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Param } from 'app/auth/models/data.model'
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-show-class-level',
  templateUrl: './show-class-level.component.html',
  styleUrls: ['./show-class-level.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShowClassLevelComponent implements OnInit {
  class_level: ClassLevel
  queryParams: Param = {}
  contentHeader: object
  students: Paginate<Student>

  constructor(
    private _route: ActivatedRoute,
    private _translateService: TranslateService,
    private _router: Router,
  ) {}

  onSearch(data: string) {}

  paginate(page?: {
    count: number
    limit: number
    offset: number
    pageSize: number
  }) {
    if (page) {
      this.queryParams.per_page = page.pageSize
      this.queryParams.page = page.offset + 1
    }
    console.log(this.queryParams)

    this._router.navigate(['./'], {
      queryParams: this.queryParams,
      relativeTo: this._route,
      replaceUrl: true,
    })
  }

  ngOnInit(): void {
    this._route.data.subscribe(
      (data: { class_level: ClassLevel; students: Paginate<Student> }) => {
        console.log(data.class_level)
        this.class_level = data.class_level
        this.students = data.students
      },
    )

    // get the queryParams
    this._route.queryParams.subscribe((data) => {
      this.queryParams = JSON.parse(JSON.stringify(data))
    })

    // transaltion service
    this._translateService
      .get('content.title.detail')
      .subscribe((title: string) => {
        this.contentHeader = {
          headerTitle: title,
          actionButton: false,
          breadcrumb: {
            type: '',
            links: [
              {
                name: this._translateService.instant(
                  'content.title.class_levels',
                ),
                isLink: true,
                link: './../',
                params: {
                  'with[]': 'level',
                  per_page: 15,
                  page: 1,
                  'columns[]': ['id', 'name', 'level_id'],
                },
              },
              {
                name: this._translateService.instant('content.title.students'),
                isLink: false,
              },
            ],
          },
        }
      })
  }
}

import { ActivatedRoute } from '@angular/router'
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

  constructor(
    private _route: ActivatedRoute,
    private _translateService: TranslateService,
  ) {}

  onSearch(data: string) {}

  ngOnInit(): void {
    this._route.parent.parent.data.subscribe((data) => {
      console.log(data)
    })

    this._route.data.subscribe((data: { class_level: ClassLevel }) => {
      console.log(data.class_level)
      this.class_level = data.class_level
    })

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
          actionButton: true,
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

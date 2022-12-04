import { Paginate } from 'app/auth/models/base.model'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core'
import { ClassRoom, Course } from '../establishment.model'
import { Param } from 'app/auth/models/data.model'
import { TranslateService } from '@ngx-translate/core'
import { NgbModal, NgbTypeahead } from '@ng-bootstrap/ng-bootstrap'
import { Subject } from 'rxjs'

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CoursesComponent implements OnInit {
  courses: Paginate<Course>
  public contentHeader!: any
  public queryParams: Param = {}
  public basicSelectedOption: number = 5
  searchTimeout: NodeJS.Timeout
  editingClassRoom!: Course
  deletedRow!: Course

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _translateService: TranslateService,
    private _modalService: NgbModal,
  ) {}

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
        console.log(result)

        if (result) {
          this.courses.data = [result, ...this.courses.data]
          this.courses.data = [...this.courses.data]
        }
      })
      .catch((_) => {})
  }

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

  onSearch(_: string) {
    if (this.searchTimeout) clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      this.paginate()
    }, 500)
  }

  ngOnInit(): void {
    this._route.data.subscribe((data: { courses: Paginate<Course> }) => {
      this.courses = data.courses
      console.log(this.courses)
    })

    // get the queryParams
    this._route.queryParams.subscribe((data) => {
      this.queryParams = JSON.parse(JSON.stringify(data))
    })
  }
}

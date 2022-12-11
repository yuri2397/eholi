import { Semester } from './../../models/semester.model'
import { ClassLevelCourseService } from './../../services/class-level-courses.service'
import { ClassLevelCourse } from './../../models/class-level-course.model'
import { ActivatedRoute } from '@angular/router'
import { ClassLevel } from './../../models/class-level.model'
import { finalize, min, timeout } from 'rxjs/operators'
import { CourseService } from './../../services/course.service'
import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { Course } from '../../establishment.model'

@Component({
  selector: 'app-create-class-course',
  templateUrl: './create-class-course.component.html',
  styleUrls: ['./create-class-course.component.scss'],
})
export class CreateClassCourseComponent implements OnInit {
  @Input('modal') modal: any
  form: FormGroup
  selectLoading = false
  createdLoad = false
  buildings!: any[]
  courseSearchLoad: boolean
  waitBeforeSearch: NodeJS.Timeout
  coursesList: Course[] = []
  classList: ClassLevel[] = []
  semesterList: Semester[] = []

  constructor(
    private _fb: FormBuilder,
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
    private _modalService: NgbModal,
    private _courseService: CourseService,
    private _classLevelCourseService: ClassLevelCourseService,
    private _route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      console.log(data)
      this.classList = data.class_levels
      this.semesterList = data.semesters
    })
    this.form = new FormGroup({
      max_note: new FormControl(10, [Validators.required, Validators.min(0)]),
      coef: new FormControl(1, [Validators.required]),
      name: new FormControl('', [Validators.minLength(2)]),
      semester_id: new FormControl('', [Validators.required]),
      class_level_id: new FormControl('', [Validators.required]),
      course_id: new FormControl(null),
    })
  }

  get name() {
    return this.form.get('name')
  }

  get coef() {
    return this.form.get('coef')
  }

  get max_note() {
    return this.form.get('max_note')
  }

  get semester_id() {
    return this.form.get('semester_id')
  }

  get class_level_id() {
    return this.form.get('class_level_id')
  }

  selectEvent(item: Course) {
    // do something with selected item
    console.log(item)
    this.form.patchValue({ name: item.name, course_id: item.id })
  }

  onCourseSearch(data: string) {
    this.form.patchValue({ name: data })
    if (data && data.length > 2) {
      // wait 500 ms and search
      if (this.waitBeforeSearch) clearTimeout(this.waitBeforeSearch)
      this.courseSearchLoad = true

      this.waitBeforeSearch = setTimeout(() => {
        this._courseService
          .index({
            search_query: data,
            per_page: 50,
            page: 1,
          })
          .pipe(finalize(() => (this.courseSearchLoad = false)))
          .subscribe({
            next: (response) => {
              console.log(response)
              this.coursesList = response.data
            },
            error: (errors) => {
              console.log(errors)
            },
          })
      }, 500)
    }
  }

  submit(form: any) {
    this.createdLoad = true
    console.log(form)
    this._classLevelCourseService
      .create(form)
      .pipe(finalize(() => (this.createdLoad = false)))
      .subscribe({
        next: (response) => {
          console.log(response)
          this._toastrService.success(
            this._translateService.instant('course.create.message.success'),
            this._translateService.instant('content.notifications.title'),
          )
          this.modal.close(response)
        },
        error: (errors) => {
          console.log(errors)
          this._toastrService.error(
            this._translateService.instant('course.create.message.error'),
            this._translateService.instant('content.notifications.title'),
          )
        },
      })
  }
}
import { TranslateService } from '@ngx-translate/core'
import { Professor } from './../professor'
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { finalize } from 'rxjs/operators'
import { ToastrService } from 'ngx-toastr'
import { ClassLevelCourseService } from 'app/modules/establishment/services/class-level-courses.service'
import { ClassLevelCourse } from 'app/modules/establishment/models/class-level-course.model'

@Component({
  selector: 'app-attach-course-professor',
  templateUrl: './attach-course-professor.component.html',
  styleUrls: ['./attach-course-professor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AttachCouresProfessorComponent implements OnInit {
  @Input('modal') modal: any
  @Input('professor') professor: Professor
  createdLoad = false
  courses: any[] = []
  selectedCourse: ClassLevelCourse
  courseSearchLoad = false
  timer: NodeJS.Timeout
  alreadyTake: boolean = false
  message: string
  constructor(
    private _fb: FormBuilder,
    private _classLevelCourseService: ClassLevelCourseService,
    private _toastr: ToastrService,
    private _translate: TranslateService,
  ) {}

  onClassLevelChange(item: any) {
    if (item && this.courses && this.courses.length) {
      this.selectedCourse = this.courses.find((course) => course.id === item)
      console.log('CHANGE', this.selectedCourse)
      this.alreadyTake = false
      if (this.selectedCourse && this.selectedCourse.professor_id != null) {
        this.alreadyTake = true
        this.message = 'course.messages.already_taken'
      }
    }
  }

  onClassLevelSearch(data: { term: string }) {
    if (this.timer) clearTimeout(this.timer)
    this.courseSearchLoad = true
    this.timer = setTimeout(() => {
      this._classLevelCourseService
        .index({
          search_query: data.term,
          'with[]': ['course', 'class_level', 'semester'],
          per_page: 30,
        })
        .pipe(finalize(() => (this.courseSearchLoad = false)))
        .subscribe({
          next: (response) => {
            this.courses = response.data

            console.log(this.courses)
          },
          error: (error) => {
            console.log(error)
          },
        })
    }, 500)
  }

  save() {
    if (this.selectedCourse) {
      this.createdLoad = true
      this._classLevelCourseService
        .update(this.selectedCourse.id, {
          professor_id: this.professor.id,
        })
        .pipe(finalize(() => (this.createdLoad = false)))
        .subscribe({
          next: (response) => {
            this._toastr.success(
              this._translate.instant('course.messages.successfully_attached'),
              this._translate.instant('course.messages.success'),
            )
            this.modal.close(response)
          },
          error: (error) => {
            console.log(error)
          },
        })
    }
  }

  /**
   * LIVE CYCLE
   */

  ngOnInit(): void {}
}

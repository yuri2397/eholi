import { TranslateService } from '@ngx-translate/core'
import { first, finalize } from 'rxjs/operators'
import { ProfessorsService } from './../professors.service'
import { ClassLevelCourse } from './../../establishment/models/class-level-course.model'
import { Professor } from './../professor'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { ToastrService } from 'ngx-toastr'
import { SchoolHasProfessor } from 'app/shared/models/school_has_professor.model'

@Component({
  selector: 'app-show-professor',
  templateUrl: './show-professor.component.html',
  styleUrls: ['./show-professor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShowProfessorComponent implements OnInit {
  data: SchoolHasProfessor
  courses: ClassLevelCourse[]
  file: any
  avatarLoad: boolean

  constructor(
    private _route: ActivatedRoute,
    private _modalService: NgbModal,
    private _professorService: ProfessorsService,
    private _toastr: ToastrService,
    private _translate: TranslateService,
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      console.log(data)
      this.courses = data.courses
      this.data = data.professor
    })
  }

  uploadImage(event: any) {
    this.file = event.target.files[0]
    if (this.file != null) {
      this.saveAvatar()
    }
  }

  addCourse(modal: any) {
    this._modalService
      .open(modal, {
        centered: true,
        windowClass: 'modal modal-primary',
        size: 'lg',
        keyboard: false,
      })
      .result.then((result) => {
        console.log(result, 'result')

        if (result) {
          this.courses = [result, ...this.courses]
        }
      })
      .catch((_) => {})
  }

  saveAvatar() {
    this.avatarLoad = true
    this._professorService
      .attachAvatar(this.data.professor.id, this.file)
      .pipe(
        first(),
        finalize(() => (this.avatarLoad = false)),
      )
      .subscribe({
        next: (response: Professor) => {
          this.data.professor.media = [...response.media]
          this._toastr.success(
            this._translate.instant('professor.messages.avatar_updated'),
            'Notification',
          )
        },
        error: (error) => {
          console.log(error)
        },
      })
  }
}

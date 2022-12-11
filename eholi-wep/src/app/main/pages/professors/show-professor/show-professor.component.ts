import { ClassLevelCourse } from './../../establishment/models/class-level-course.model'
import { Professor } from './../professor'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-show-professor',
  templateUrl: './show-professor.component.html',
  styleUrls: ['./show-professor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ShowProfessorComponent implements OnInit {
  professor: Professor
  courses: ClassLevelCourse[]

  constructor(
    private _route: ActivatedRoute,
    private _modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      console.log(data)
      this.courses = data.courses
      this.professor = data.professor
    })
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
}

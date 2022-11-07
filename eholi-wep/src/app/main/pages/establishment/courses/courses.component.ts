import { Paginate } from 'app/auth/models/base.model'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Course } from '../establishment.model'

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Paginate<Course>

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.data.subscribe((data: { courses: Paginate<Course> }) => {
      this.courses = data.courses
      console.log(this.courses)
    })
  }
}

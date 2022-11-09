import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Student } from '../student.model'
import { Param } from 'app/auth/models/data.model'

@Component({
  selector: 'app-student',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  students: Paginate<Student>
  queryParam: Param
  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    // Get the resolver data
    this._route.data.subscribe((data: { students: Paginate<Student> }) => {
      console.log(data)
      this.students = data.students
    })

    // Get the default queryParams
    this._route.queryParams.subscribe((params) => {
      this.queryParam = params
      console.log(this.queryParam)
    })
  }
}

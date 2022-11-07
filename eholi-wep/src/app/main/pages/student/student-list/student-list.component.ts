import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Student } from '../student.model'

@Component({
  selector: 'app-student',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
})
export class StudentListComponent implements OnInit {
  students: Paginate<Student>
  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.data.subscribe((data: { students: Paginate<Student> }) => {
      console.log(data)
      this.students = data.students
    })
  }
}

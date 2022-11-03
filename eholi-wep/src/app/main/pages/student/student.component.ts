import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Student } from './student.model'

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent implements OnInit {
  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.data.subscribe((data: { students: Paginate<Student> }) =>
      console.log(data.students.data),
    )
  }
}

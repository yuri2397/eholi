import { Student } from './../student.model'
import { Paginate } from './../../../../auth/models/base.model'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'



@Component({
  selector: 'app-student-show',
  templateUrl: './student-show.component.html',
  styleUrls: ['./student-show.component.scss'],
})
export class StudentShowComponent implements OnInit {
  student: Student
  public data:any;


  constructor(private _route: ActivatedRoute,private _translateService: TranslateService,) {}

  ngOnInit(): void {
    this._route.data.subscribe(
      (data: { student: Student }) => (this.student = data.student),
    )
    this.data=this.student;
  }
}

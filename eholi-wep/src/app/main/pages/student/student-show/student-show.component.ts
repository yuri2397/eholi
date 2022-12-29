import { Student, StudentMetaData } from "./../student.model";
import { Paginate } from "./../../../../auth/models/base.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-student-show",
  templateUrl: "./student-show.component.html",
  styleUrls: ["./student-show.component.scss"],
})
export class StudentShowComponent implements OnInit {
  student: Student;
  meta_data: StudentMetaData;

  constructor(private _route: ActivatedRoute) {}

  ngOnInit(): void {
    this._route.data.subscribe((data: { student: Student, meta_data: StudentMetaData }) => {
      this.student = data.student;
      this.meta_data = data.meta_data;
      console.log(data);
    });
  }

  subName() {
    return this.student.first_name[0] + this.student.last_name[0];
  }

}

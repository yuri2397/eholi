import { Utils } from './../../../../auth/helpers/utils';
import { ClassLevelTestExamService } from "./../../establishment/services/class-level-test-exam.service";
import { DeliberationService } from "./../../establishment/services/deliberationservice";
import { Student, StudentMetaData } from "./../student.model";
import { Paginate } from "./../../../../auth/models/base.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ClassLevel } from '../../establishment/establishment.model';

@Component({
  selector: "app-student-show",
  templateUrl: "./student-show.component.html",
  styleUrls: ["./student-show.component.scss"],
})
export class StudentShowComponent implements OnInit {
  student: Student;
  meta_data: StudentMetaData;
  results: any[] = [];
  deliberations: any;
  class_level: ClassLevel;
  constructor(
    private _route: ActivatedRoute,
    private testService: ClassLevelTestExamService,
    private _delService: DeliberationService
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe(
      (data: { student: Student; meta_data: StudentMetaData }) => {
        this.student = data.student;
        this.meta_data = data.meta_data;
        this.class_level = this.meta_data.class_levels as any;
        console.log(data);
      }
    );
  }

  subName() {
    return this.student.first_name[0] + this.student.last_name[0];
  }

  tutorType(type: string) {
    return "tutor.select." + type;
  }

  downloadBT(deliberation: any){
    this._delService.downloadBT({
      'student_id': this.student.id,
      'semester_id': deliberation.semester.id,
      'deliberation_id': deliberation.id
    }).subscribe({
      next: (response: any) => {
        Utils.printContentHtml(response, this.student.first_name + " " + this.student.last_name + "_builtin");
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  getTests(event: any) {
    this.testService
      .studentClassLevelTest({
        student_id: this.student.id,
        class_level_id: this.meta_data?.class_levels?.id,
      })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          this.results = response;
        },
      });
  }

  getDeliberation(event: any) {
    this._delService.studentDeliberation({
      student_id: this.student.id,
      class_level_id: this.meta_data?.class_levels?.id,
    }).subscribe({
      next: (response: any) => {
        console.log(response);
        this.deliberations = response;
      },
      error: (err: any) => {
        console.log(err);
      },
    });
  }
}

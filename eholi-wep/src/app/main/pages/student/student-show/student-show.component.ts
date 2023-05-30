import { Utils } from './../../../../auth/helpers/utils';
import { ClassLevelTestExamService } from "./../../establishment/services/class-level-test-exam.service";
import { DeliberationService } from "./../../establishment/services/deliberationservice";
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
  results: any[] = [];
  deliberations: any;
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
        console.log(data);
      }
    );
  }

  subName() {
    return this.student.first_name[0] + this.student.last_name[0];
  }

  tutorType(type: string) {
    return "tutor.select" + type;
  }

  downloadBT(semester: any){
    this._delService.downloadBT({
      'student_id': this.student.id,
      'semester_id': semester.id,
      'deliberation_id': this.deliberations.deliberation.id
    }).subscribe({
      next: (response: any) => {
        console.log(response)
        Utils.printContentHtml(response, 'bulletin');
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

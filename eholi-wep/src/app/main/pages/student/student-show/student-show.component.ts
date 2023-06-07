import { first } from 'rxjs/operators';
import { StudentSubscribeService } from './../../establishment/services/student-subscribes.service';
import { StudentService } from "./../student.service";
import { Utils } from "./../../../../auth/helpers/utils";
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
  file: any;
  previewImage: any;
  constructor(
    private _route: ActivatedRoute,
    private testService: ClassLevelTestExamService,
    private _delService: DeliberationService,
    private _studentService: StudentService,
    private _studenSubService: StudentSubscribeService
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

  myEcard(){
    this._studenSubService.myEcard({
      student_id: this.student.id,
      class_level_id: this.meta_data['class_levels'].id,
    }).pipe(first()).subscribe({
      next: (response: any) => {
        Utils.printContentHtml(response, this.student.fullname)
      },
      error: (error: any) =>{
        console.log(error);
      }
    });
  }

  onFileChosed(data: any) {
    console.log(data);
    const file: File = data.target.files[0];
    if (file) {
      // const reader = new FileReader();
      // reader.readAsDataURL(file);
      // reader.onload = () => {
      //   console.log(reader.result);
      //   this.previewImage = reader.result;
      // };
      console.log(file)
      let updatedAvatarFormData = new FormData();
      updatedAvatarFormData.append("image", file);
      this._studentService
        .updateAvatar(updatedAvatarFormData, this.student.id)
        .subscribe({
          next: (response: Student) => {
            console.log(response);
            this.student.media = [...response.media];
          },
          error: (errors) => {
            console.log(errors);
          },
        });
    }
  }
  downloadBT(semester: any) {
    this._delService
      .downloadBT({
        student_id: this.student.id,
        semester_id: semester.id,
        deliberation_id: this.deliberations.deliberation.id,
      })
      .subscribe({
        next: (response: any) => {
          console.log(response);
          Utils.printContentHtml(response, "bulletin");
        },
        error: (error) => {
          console.log(error);
        },
      });
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
    this._delService
      .studentDeliberation({
        student_id: this.student.id,
        class_level_id: this.meta_data?.class_levels?.id,
      })
      .subscribe({
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

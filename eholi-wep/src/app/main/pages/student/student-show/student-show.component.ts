import { first } from 'rxjs/operators';
import { StudentService } from "./../student.service";
import { Utils } from "./../../../../auth/helpers/utils";
import { Student, StudentMetaData } from "./../student.model";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Deliberation, ClassLevel } from 'app/modules/establishment/establishment.model';
import { ClassLevelTestExamService } from 'app/modules/establishment/services/class-level-test-exam.service';
import { DeliberationService } from 'app/modules/establishment/services/deliberationservice';
import { StudentSubscribeService } from 'app/modules/establishment/services/student-subscribes.service';

@Component({
  selector: "app-student-show",
  templateUrl: "./student-show.component.html",
  styleUrls: ["./student-show.component.scss"],
})
export class StudentShowComponent implements OnInit {
  student: Student;
  meta_data: StudentMetaData;
  results: any[] = [];
  deliberations: Deliberation[] = [];
  class_level: ClassLevel;
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

  myEcard(){
    this._studenSubService.myEcard({
      student_id: this.student.id,
      class_level_id: this.meta_data['class_levels'].id,
    }).pipe(first()).subscribe({
      next: (response: any) => {
        Utils.printContentHtml(response, this.student.first_name + " " + this.student.last_name + "_builtin");
      },
      error: (error: any) =>{
        console.log(error);
      }
    });
  }

  changeRoom(status: boolean){
    console.log(status);
    if(status){
      
    }
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
  downloadBT(deliberation: any) {
    
    this._delService
      .downloadBT({
        student_id: this.student.id,
        semester_id: deliberation.semester_id,
        deliberation_id: deliberation.id,
      })
      .subscribe({
        next: (response: any) => {
          Utils.printContentHtml(response, this.student.first_name + " " + this.student.last_name + "_builtin");
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

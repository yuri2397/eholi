import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Course} from '../../models/course.model';
import {ClassLevel} from '../../models/class-level.model';
import {Semester} from '../../models/semester.model';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {CourseService} from '../../services/course.service';
import {ClassLevelCourseService} from '../../services/class-level-courses.service';
import {ActivatedRoute} from '@angular/router';
import {finalize, first} from 'rxjs/operators';
import {ClassLevelTestExamService} from '../../services/class-level-test-exam.service';
import {ClassLevelCourse} from '../../models/class-level-course.model';
import Swal from 'sweetalert2';
import { Professor } from 'app/main/pages/professors/professor';
import { ProfessorsService } from 'app/main/pages/professors/professors.service';

@Component({
  selector: "app-create-class-level-test-exam",
  templateUrl: "./create-class-level-test-exam.component.html",
  styleUrls: ["./create-class-level-test-exam.component.scss"],
})
export class CreateClassLevelTestExamComponent implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input("modal") modal: any;
  @Input("classLevel") classLevel: any;
  form: FormGroup;
  selectLoading = false;
  createdLoad = false;
  buildings!: any[];
  courseSearchLoad: boolean;
  waitBeforeSearch: NodeJS.Timeout;
  coursesList: ClassLevelCourse[] = [];
  classList: ClassLevel[] = [];
  semesterList: Semester[] = [];
  professorList: Professor[] = [];
  professorSearchLoad = false;
  types: any[] = [];
  selectedCourse: ClassLevelCourse;

  constructor(
    private _fb: FormBuilder,
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
    private _modalService: NgbModal,
    private _examService: ClassLevelTestExamService,
    private _courseService: ClassLevelCourseService,
    private _route: ActivatedRoute,
    private _professorService: ProfessorsService
  ) {}

  get class_level_has_course_id() {
    return this.form.get("class_level_has_course_id");
  }

  get type() {
    return this.form.get("type");
  }

  // get percent() {
  //     return this.form.get('percent');
  // }

  get class_level_id() {
    return this.form.get("class_level_id");
  }

  get date() {
    return this.form.get("date");
  }

  ngOnInit(): void {
    console.log(this.classLevel);
    this.fetchCoursesList();
    this.types = [
      {
        label: this._translateService.instant("test_exams.field.type.exam"),
        value: "exam",
      },
      {
        label: this._translateService.instant("test_exams.field.type.duty"),
        value: "duty",
      },
    ];
    this.form = new FormGroup({
      school_has_professor_id: new FormControl(null, [Validators.required]),
      class_level_has_course_id: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      date: new FormControl(null, [Validators.required]),
      // percent: new FormControl(null, [Validators.min(0), Validators.max(100)]),
      class_level_id: new FormControl(this.classLevel, [Validators.required]),
      max_note: new FormControl(null, [Validators.required]),
      title: new FormControl(null, [Validators.required]),
    });
  }

  selectEvent(item: Course) {
    // do something with selected item
    console.log(item);
    this.form.patchValue({
      name: item.name,
      class_level_has_course_id: item.id,
    });
  }

  onCourseSearch(data: string) {
    if (data && data.length > 2) {
      // wait 500 ms and search
      if (this.waitBeforeSearch) {
        clearTimeout(this.waitBeforeSearch);
      }
      this.courseSearchLoad = true;

      this.waitBeforeSearch = setTimeout(() => {
        this.fetchCoursesList(data);
      }, 500);
    }
  }

    public fetchCoursesList(searchQuery?: string) {
        this._courseService
            .index<any>({
                search_query: searchQuery ?? '',
                'filter[class_level_id]': this.classLevel,
                'with[]': ['course', 'semester', 'professor']
            })
            .pipe(finalize(() => (this.courseSearchLoad = false)))
            .subscribe({
                next: (response: any) => {
                    this.coursesList = (response as ClassLevelCourse[]).sort((a, b) => a.semester.number - b.semester.number)
                },
                error: (errors) => {
                    console.log(errors);
                },
            });
    }

  submit(form: any) {
    this.createdLoad = true;
    console.log(form);
    this._examService
      .create(form)
      .pipe(finalize(() => (this.createdLoad = false)))
      .subscribe({
        next: (response) => {
          console.log(response);
          this._toastrService.success(
            this._translateService.instant("test_exams.create.message.success"),
            this._translateService.instant("content.notifications.title")
          );
          this.modal.close(response);
        },
        error: (errors) => {
          console.log(errors);
          Swal.fire({
            title: this._translateService.instant(
              "content.notifications.title"
            ),
            text: errors,
            icon: "error",
            showCancelButton: false,
          });
          // this._toastrService.error(
          //     this._translateService.instant('test_exams.create.message.error'),
          //     this._translateService.instant('content.notifications.title')
          // );
        },
      });
  }

    courseModelChange(change: any) {
        this.selectedCourse = this.coursesList.find((course) => course.id === change) ;
        this.form.patchValue({
            max_note: this.selectedCourse?.max_note,
            title:`Teste - ${this.selectedCourse?.course?.name}`,
            school_has_professor_id: this.selectedCourse?.professor?.id,
        });
    }
}

import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { TestExam, TestResult } from "../../models/test-exam.model";
import { ClassLevelService } from "../../services/class-level.service";
import { first } from "rxjs/operators";
import { TranslateService } from "@ngx-translate/core";
import Swal from "sweetalert2";
import { Location } from "@angular/common";
import { ClassLevelTestExamService } from "../../services/class-level-test-exam.service";

@Component({
  selector: "app-details-test-exams",
  templateUrl: "./details-test-exams.component.html",
  styleUrls: ["./details-test-exams.component.scss"],
})
export class DetailsTestExamsComponent implements OnInit {
  test: TestExam;
  results: TestResult[] = [];

  contentHeader: any;
  editResult = false;
  activeDeleteBtn = true;
  deleteLoad = false;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _classLevelService: ClassLevelService,
    private _translateService: TranslateService,
    private _testExamService: ClassLevelTestExamService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.test = data.data;
      this.results = this.test.test_results?.sort((a, b) =>
        a.student.last_name.localeCompare(b.student.last_name)
      );
      console.log(data);
    });

    this._translateService.get("test_results.title").subscribe((value) => {
      this.contentHeader = {
        headerTitle: value,
        actionButton: false,
      };
    });
  }

  updateResult(result: TestResult) {
    result.loading = true;
    result.status = "ok";
    this._testExamService
      .updateTestResult(result.id, result)
      .pipe(first())
      .subscribe({
        next: (data) => {
          console.log(data);
          result.loading = false;
          result.success = true;
          setTimeout(() => {
            result.success = false;
            result.active = false;
          }, 2000);
        },
        error: (error) => {
          result.loading = false;
        },
      });
  }

  changeActionType(_: any) {
    if (!this.editResult) {
      this.results.forEach((e) => (e.active = false));
    }
  }

  activeInput(result: any){
    console.log(result)
    result.active = true
  }

  confirmDeleteModal() {
    this._translateService.get(["test_results.delete"]).subscribe({
      next: (data: string[]) => {
        let content = data["test_results.delete"];
        Swal.fire({
          title: content.title,
          text: content.alert_explain,
          icon: "error",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: content.btn_confirm,
          cancelButtonText: content.btn_cancel,
        }).then((result) => {
          if (result.isConfirmed) {
            this._delete();
          }
        });
      },
    });
  }
  _delete() {
    this.deleteLoad = true;
    this._testExamService.delete(this.test.id).subscribe({
      next: (data) => {
        this.deleteLoad = false;
        Swal.fire({
          icon: "success",
          title: this._translateService.instant("content.notifications.success.title"),
          text: this._translateService.instant('content.notifications.success.message'),
          customClass: {
            confirmButton: "btn btn-success",
          },
          confirmButtonText: this._translateService.instant("content.btn.close"),
        }).then( (_) => {
            this._location.back();
        });

      },
      error: (errors) => {
        this.deleteLoad = false;
        Swal.fire({
            icon: "error",
            title: this._translateService.instant("content.notifications.error.title"),
            text: this._translateService.instant('content.notifications.error.message'),
            customClass: {
              confirmButton: "btn btn-primary",
            },
            confirmButtonText: this._translateService.instant("content.btn.close"),
          });
        console.log(errors);
      },
    });
  }
}

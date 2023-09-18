import { finalize } from "rxjs/operators";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { StudentService } from "../student/student.service";
import { Student } from "../student/student.model";

@Component({
  selector: "app-recitation",
  templateUrl: "./recitation.component.html",
  styleUrls: ["./recitation.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RecitationComponent implements OnInit {
  public contentHeader!: any;
  datas: any;
  searchLoad = false;
  loadingIndicator = false;
  constructor(
    private _route: ActivatedRoute,
    private _translateService: TranslateService,
    private _router: Router,
    private _modalService: NgbModal,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    // transaltion service
    this._translateService
      .get("recitations.title")
      .subscribe((title: string) => {
        this.contentHeader = {
          headerTitle: title,
          actionButton: false,
        };
      });
  }

  onSearch(data: string) {
    if (data && data.length > 2) {
      this.searchLoad = true;
      this.studentService
        .index<Student>({
          search_query: data,
          per_page: "10",
          page: 1,
          'with[]': ['student']
        })
        .pipe(finalize(() => (this.searchLoad = false)))
        .subscribe({
          next: (response) => {
            console.log(response);
            this.datas = response.data;
          },
          error: (errors) => {
            console.log(errors);
          },
        });
    }
  }

  userInitial(fn: string, ln: string){
    return fn[0] + ln[0];
  }
}

import { StudentService } from "./../student.service";
import { Paginate } from "app/auth/models/base.model";
import { Student } from "./../student.model";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  styleUrls: ["./registration.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class RegistrationComponent implements OnInit {
  public contentHeader: object;
  dataSource: Paginate<Student>;
  searchTimeout: NodeJS.Timeout;
  selectedRow: Student;

  constructor(
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
    private _studentSerivce: StudentService,
    private _modalService: NgbModal,
  ) {}

  onSearch(data: string) {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);

    this.searchTimeout = setTimeout(() => {
      this._studentSerivce
        .index<Student>({
          search_query: data,
          per_page: 15,
          page: 1,
        })
        .subscribe({
          next: (response) => {
            console.log(response);
            this.dataSource = response;
          },
          error: (errors) => {
            console.log(errors);
          },
        });
    }, 500);
  }


  openCreateModal(modal: string, row: Student){
    this.selectedRow = row;
    this._modalService
    .open(modal, {
      centered: true,
      windowClass: 'modal modal-primary',
      size: 'lg',
      keyboard: false,
    })
    .result.then((result) => {
      console.log(result);
      
    })
    .catch((_) => {})
  }

  // LIVE CYCLE
  ngOnInit(): void {
    // transaltion service
    this._translateService
      .get(["content.title.registration"])
      .subscribe((data: string[]) => {
        this.contentHeader = {
          headerTitle: data["content.title.registration"],
          actionButton: false,
        };
      });
  }
}

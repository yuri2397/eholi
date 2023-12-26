import { Paginate } from "app/auth/models/base.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ClassLevel } from "../establishment.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { Param } from "app/auth/models/data.model";
import Swal from "sweetalert2";
import { ClassLevelService } from "../services/class-level.service";
import { first } from "rxjs/operators";

@Component({
  selector: "app-class-levels",
  templateUrl: "./class-levels.component.html",
  styleUrls: ["./class-levels.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ClassLevelsComponent implements OnInit {
  class_levels: Paginate<ClassLevel>;
  public queryParams: Param = {};
  public contentHeader!: any;

  public basicSelectedOption: number = 5;
  searchTimeout: NodeJS.Timeout;
  selectedRow: ClassLevel;
  deletedRow: ClassLevel;

  constructor(
    private _route: ActivatedRoute,
    private _translateService: TranslateService,
    private _router: Router,
    private _modalService: NgbModal,
    private _classLevelService: ClassLevelService
  ) {}

  openCreateModal(modal: any) {
    this._modalService
      .open(modal, {
        centered: true,
      })
      .result.then((result) => {
        if (result) {
          this._router.navigate([], {
            relativeTo: this._route,
            queryParams: { ...this._route.queryParams, refresh: Math.random(),  },
            queryParamsHandling: "merge",
          });
        }
      })
      .catch((_) => {});
  }

  openEditModal(modal: any, row: ClassLevel) {
    this.selectedRow = row;
    this._modalService
      .open(modal, {
        centered: true,
      })
      .result.then((result) => {
        if (result) {
          this._router.navigate([], {
            relativeTo: this._route,
            queryParams: { ...this._route.queryParams, refresh: Math.random(),  },
            queryParamsHandling: "merge",
          });
        }
      })
      .catch((_) => {});
  }

  navigate(item: any) {
    console.log(item);
  }

  ConfirmTextOpen() {
    this._translateService
      .get(["content.notifications.confirm.delete", "content.btn"])
      .subscribe({
        next: (data: string[]) => {
          let text = data["content.notifications.confirm.delete"];
          let btn = data["content.btn"];
          Swal.fire({
            title: text.title,
            text: text.text,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: btn.confirm,
            cancelButtonText: btn.cancel,
          }).then((result) => {
            if (result.isConfirmed) {
              this.deleteClassLevel(this.deletedRow);
            }
          });
        },
      });
  }

  deleteClassLevel(row: ClassLevel) {
    this._classLevelService.delete(row.id).subscribe({
      next: (_) => {
        this.class_levels.data = this.class_levels.data.filter(
          (item) => item.id !== row.id
        );
        this.class_levels.data = [...this.class_levels.data];
        this._translateService
          .get("class_level.delete")
          .pipe(first())
          .subscribe((text) => {
            Swal.fire({
              icon: "success",
              title: text.title,
              text: text.message.success,
              customClass: {
                confirmButton: "btn btn-success",
              },
            });
          });
      },
      error: (err) => {},
    });
  }

  /**
   * Data Section
   */
  onSearch(_: string) {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.paginate();
    }, 500);
  }

  paginate(page?: {
    count: number;
    limit: number;
    offset: number;
    pageSize: number;
  }) {
    if (page) {
      this.queryParams.per_page = page.pageSize;
      this.queryParams.page = page.offset + 1;
    }
    console.log(this.queryParams);

    this._router.navigate(["./"], {
      queryParams: this.queryParams,
      relativeTo: this._route,
      replaceUrl: true,
    });
  }

  /**
   * LIFE CYCLE HOOKS
   */

  ngOnInit(): void {
    this._route.data.subscribe(
      (data: { class_levels: Paginate<ClassLevel> }) => {
        this.class_levels = data.class_levels;
      }
    );

    // get the queryParams
    this._route.queryParams.subscribe((data) => {
      this.queryParams = JSON.parse(JSON.stringify(data));
    });

    // transaltion service
    this._translateService
      .get("content.title.class_levels")
      .subscribe((title: string) => {
        this.contentHeader = {
          headerTitle: title,
          actionButton: false,
        };
      });
  }
}

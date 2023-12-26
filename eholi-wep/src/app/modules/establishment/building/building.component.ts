import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { Param } from "app/auth/models/data.model";
import { ClassLevelCourseService } from "../services/class-level-courses.service";
import { Building } from "../establishment.model";
import { Paginate } from "app/auth/models/base.model";
import Swal from "sweetalert2";
import { BuildingService } from "../services/building.service";
import { finalize } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-building",
  templateUrl: "./building.component.html",
  styleUrls: ["./building.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class BuildingComponent implements OnInit {
  public contentHeader!: any;
  public queryParams: Param = {};
  public basicSelectedOption = 5;
  searchTimeout: NodeJS.Timeout;

  deletedRow: Building;
  editRow: Building;
  load = true;
  buildings: Paginate<Building>;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _translateService: TranslateService,
    private _modalService: NgbModal,
    private _buildingService: BuildingService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.buildings = data.buildings;
      console.log(data.buildings);
    });

    this._translateService.get("buildings.title").subscribe((title: string) => {
      this.contentHeader = {
        headerTitle: title,
        actionButton: false,
      };
    });
  }

  onSearch(data: any) {
    this._router.navigate([], {
      relativeTo: this._route,
      queryParams: {
        ...this._route.queryParams,
        refresh: Math.random(),
        search_query: data,
      },
      queryParamsHandling: "merge",
    });
  }

  openCreateModal(modal: any) {
    this._modalService
      .open(modal, {
        centered: true,
        windowClass: "modal modal-primary",
        size: "sm",
        keyboard: false,
      })
      .result.then((result) => {
        console.log(result);
        if (result) {
          this._router.navigate([], {
            relativeTo: this._route,
            queryParams: { ...this._route.queryParams, refresh: Math.random() },
            queryParamsHandling: "merge",
          });
        }
      })
      .catch((_) => {});
  }

  removeItem(id: any) {
    this.deletedRow.deleted = true;
    this._buildingService
      .delete(this.deletedRow.id)

      .subscribe({
        next: (_) => {
          this._toastrService.success(
            this._translateService.instant(
              "content.notifications.success.message"
            ),
            this._translateService.instant(
              "content.notifications.success.title"
            )
          );
          this._router.navigate([], {
            relativeTo: this._route,
            queryParams: { ...this._route.queryParams, refresh: Math.random() },
            queryParamsHandling: "merge",
          });
        },
      });
  }

  openEditModal(modal: any, item: Building) {
    this.editRow = item;
    this._modalService
      .open(modal, {
        centered: true,
        windowClass: "modal modal-primary",
        size: "md",
        keyboard: false,
      })
      .result.then((result) => {
        this._router.navigate([], {
          relativeTo: this._route,
          queryParams: { ...this._route.queryParams, refresh: Math.random() },
          queryParamsHandling: "merge",
        });
      })
      .catch((_) => {});
  }

  ConfirmTextOpen() {
    this._translateService
      .get(["content.notifications.confirm.delete", "content.btn"])
      .subscribe({
        next: (data: string[]) => {
          const text = data["content.notifications.confirm.delete"];
          const btn = data["content.btn"];
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
              this.removeItem(this.deletedRow);
            }
          });
        },
      });
  }
}

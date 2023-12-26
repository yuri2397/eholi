import { first } from "rxjs/operators";
import { Param } from "app/auth/models/data.model";
import { TranslateService } from "@ngx-translate/core";
import { Paginate } from "app/auth/models/base.model";
import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ClassRoom } from "../establishment.model";
import { CoreSidebarService } from "@core/components/core-sidebar/core-sidebar.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import Swal from "sweetalert2";
import { ClassRoomService } from "../services/class-room.service";

@Component({
  selector: "app-class-rooms",
  templateUrl: "./class-rooms.component.html",
  styleUrls: ["./class-rooms.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class ClassRoomsComponent implements OnInit {
  public contentHeader!: any;
  public queryParams: Param = {};
  class_rooms: Paginate<ClassRoom>;
  public basicSelectedOption: number = 5;
  searchTimeout: NodeJS.Timeout;
  editingClassRoom!: ClassRoom;
  deletedRow!: ClassRoom;

  constructor(
    private _route: ActivatedRoute,
    private _translateService: TranslateService,
    private _router: Router,
    private _modalService: NgbModal,
    private _classRoomService: ClassRoomService
  ) {}

  openCreateModal(modal: any) {
    this._modalService
      .open(modal, {
        centered: true,
        windowClass: "modal modal-primary",
        size: "md",
        keyboard: false,
      })
      .result.then((result) => {
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

  openEditModal(modal: any, item: ClassRoom) {
    this.editingClassRoom = item;
    this._modalService
      .open(modal, {
        centered: true,
        windowClass: "modal modal-primary",
        size: "md",
        keyboard: false,
      })
      .result.then((result) => {
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

  ConfirmTextOpen() {
    this._translateService
      .get(["content.notifications.confirm.delete", "content.btn"])
      .subscribe({
        next: (data: string[]) => {
          console.log(data);

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
              this.deleteClassRoom();
            }
          });
        },
      });
  }

  deleteClassRoom() {
    this._classRoomService.delete(this.deletedRow.id).subscribe({
      next: (_) => {
        this.class_rooms.data.splice(
          this.class_rooms.data.indexOf(this.deletedRow),
          1
        );
        this.class_rooms.data = [...this.class_rooms.data];
        console.log(this.class_rooms.data.length);

        this._translateService
          .get("class_room.delete")
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
      error: (errors) => {
        console.log(errors);
      },
    });
  }

  ngOnInit(): void {
    // Get resolvers data
    this._route.data.subscribe((data: { class_rooms: Paginate<ClassRoom> }) => {
      this.class_rooms = data.class_rooms;
      console.log(this.class_rooms);
    });

    // get the queryParams
    this._route.queryParams.subscribe((data) => {
      this.queryParams = JSON.parse(JSON.stringify(data));
    });

    // transaltion service
    this._translateService
      .get("content.title.class_rooms")
      .subscribe((title: string) => {
        this.contentHeader = {
          headerTitle: title,
          actionButton: false,
        };
      });
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

  onSearch(_: string) {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => {
      this.paginate();
    }, 500);
  }
}

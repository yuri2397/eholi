import { Paginate } from 'app/auth/models/base.model'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Room } from '../establishment.model'
import { Param } from 'app/auth/models/data.model'
import { TranslateService } from '@ngx-translate/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2'
import { RoomService } from '../services/room.service'
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-housing',
  templateUrl: './housing.component.html',
  styleUrls: ['./housing.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HousingComponent implements OnInit {
  rooms: Paginate<Room>
  queryParams: Param = {}

  searchTimeout: NodeJS.Timeout

  contentHeader: { headerTitle: string; actionButton: boolean }
  selectedRow: Room
  deletedRow: Room

  constructor(
    private _route: ActivatedRoute,
    private _translateService: TranslateService,
    private _router: Router,
    private _modalService: NgbModal,
    private _roomService: RoomService,
  ) {}

  /**
   * DATAS
   */

  onSearch(_: string) {
    if (this.searchTimeout) clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      this.paginate()
    }, 500)
  }

  paginate(page?: {
    count: number
    limit: number
    offset: number
    pageSize: number
  }) {
    if (page) {
      this.queryParams.per_page = page.pageSize
      this.queryParams.page = page.offset + 1
    }

    this._router.navigate(['./'], {
      queryParams: this.queryParams,
      relativeTo: this._route,
      replaceUrl: true,
    })
  }

  openCreateModal(modal: any) {
    this._modalService
      .open(modal, {
        centered: true,
      })
      .result.then((result) => {
        console.log(result)

        if (result) {
          this.rooms.data = [...[result, ...this.rooms.data]]
        }
      })
      .catch((_) => {})
  }

  openEditModal(modal: any, row: Room) {
    this.selectedRow = row
    this._modalService
      .open(modal, {
        centered: true,
      })
      .result.then((result) => {
        if (result) {
          const index = this.rooms.data.findIndex(
            (item) => item.id === result.id,
          )
          this.rooms.data[index] = result
          this.rooms.data = [...this.rooms.data]
        }
      })
      .catch((_) => {})
  }

  ConfirmTextOpen() {
    this._translateService
      .get(['content.notifications.confirm.delete', 'content.btn'])
      .subscribe({
        next: (data: string[]) => {
          let text = data['content.notifications.confirm.delete']
          let btn = data['content.btn']
          Swal.fire({
            title: text.title,
            text: text.text,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: btn.confirm,
            cancelButtonText: btn.cancel,
          }).then((result) => {
            if (result.isConfirmed) {
              this._deleteRoom(this.deletedRow)
            }
          })
        },
      })
  }

  _deleteRoom(row: Room) {
    this._roomService.delete(row.id).subscribe({
      next: (_) => {
        this.rooms.data = this.rooms.data.filter((item) => item.id !== row.id)
        this.rooms.data = [...this.rooms.data]
        this._translateService
          .get('room.delete')
          .pipe(first())
          .subscribe((text) => {
            Swal.fire({
              icon: 'success',
              title: text.title,
              text: text.message.success,
              customClass: {
                confirmButton: 'btn btn-success',
              },
            })
          })
      },
      error: (err) => {},
    })
  }

  /**
   * LIVE CYCLE
   */

  ngOnInit(): void {
    this._route.data.subscribe((data: { rooms: Paginate<Room> }) => {
      this.rooms = data.rooms
      console.log(this.rooms)
    })

    // get the queryParams
    this._route.queryParams.subscribe((data) => {
      this.queryParams = JSON.parse(JSON.stringify(data))
    })

    // transaltion service
    this._translateService
      .get('content.title.buildings')
      .subscribe((title: string) => {
        this.contentHeader = {
          headerTitle: title,
          actionButton: false,
        }
      })
  }
}

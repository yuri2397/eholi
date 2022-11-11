import { Param } from 'app/auth/models/data.model'
import { TranslateService } from '@ngx-translate/core'
import { Paginate } from 'app/auth/models/base.model'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { ClassRoom } from '../establishment.model'
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-class-rooms',
  templateUrl: './class-rooms.component.html',
  styleUrls: ['./class-rooms.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClassRoomsComponent implements OnInit {
  public contentHeader!: any
  public queryParams: Param = {}
  class_rooms: Paginate<ClassRoom>
  public basicSelectedOption: number = 5
  searchTimeout: NodeJS.Timeout

  constructor(
    private _route: ActivatedRoute,
    private _translateService: TranslateService,
    private _router: Router,
    private _modalService: NgbModal,
  ) {}

  openModal(modal: any) {
    this._modalService.open(modal, {
      centered: true,
      windowClass: 'modal modal-primary',
      size: 'md',
      keyboard: true,
    })
  }

  ngOnInit(): void {
    // Get resolvers data
    this._route.data.subscribe((data: { class_rooms: Paginate<ClassRoom> }) => {
      this.class_rooms = data.class_rooms
      console.log(this.class_rooms)
    })

    // get the queryParams
    this._route.queryParams.subscribe((data) => {
      this.queryParams = JSON.parse(JSON.stringify(data))
    })

    // transaltion service
    this._translateService
      .get('content.title.class_rooms')
      .subscribe((title: string) => {
        this.contentHeader = {
          headerTitle: title,
          actionButton: false,
        }
      })
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
    console.log(this.queryParams)

    this._router.navigate(['./'], {
      queryParams: this.queryParams,
      relativeTo: this._route,
      replaceUrl: true,
    })
  }

  onSearch(_: string) {
    if (this.searchTimeout) clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      this.paginate()
    }, 500)
  }
}

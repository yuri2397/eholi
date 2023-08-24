import { Paginate } from './../../../auth/models/base.model'
import { ProfessorsService } from './professors.service'
import { Param } from 'app/auth/models/data.model'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Professor } from './professor'
import { ActivatedRoute, Router } from '@angular/router'
import { TranslateService } from '@ngx-translate/core'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-professors',
  templateUrl: './professors.component.html',
  styleUrls: ['./professors.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfessorsComponent implements OnInit {
  public contentHeader!: any
  public queryParams: Param = {}
  public basicSelectedOption: number = 5
  searchTimeout: NodeJS.Timeout
  editingRow!: Professor
  deletedRow!: Professor
  professors!: Paginate<Professor>

  constructor(
    private _route: ActivatedRoute,
    private _translateService: TranslateService,
    private _router: Router,
    private _modalService: NgbModal,
    private _professorService: ProfessorsService,
  ) {}

  openCreateModal(modal: any) {
    this._modalService
      .open(modal, {
        centered: true,
        windowClass: 'modal modal-primary',
        size: 'lg',
        keyboard: false,
      })
      .result.then((result) => {
        console.log(result, 'result')

        if (result) {
          this._router.navigate([], { relativeTo: this._route, queryParams: this._route.queryParams, queryParamsHandling: 'merge', })
        }
      })
      .catch((_) => {})
  }

  openEditModal(modal: any, item: Professor) {
    this.editingRow = item
    this._modalService
      .open(modal, {
        centered: true,
        windowClass: 'modal modal-primary',
        size: 'lg',
        keyboard: false,
      })
      .result.then((result) => {
        if (result) {
          this.professors.data.splice(
            this.professors.data.indexOf(item),
            1,
            result,
          )
          this.professors.data = [...this.professors.data]
        }
      })
      .catch((_) => {})
  }

  openModal(modal: any) {
    this._modalService.open(modal, {
      centered: true,
      windowClass: 'modal modal-primary',
      size: 'lg',
      keyboard: true,
    })
  }

  ngOnInit(): void {
    // Get the resolver data
    this._route.data.subscribe((data: { professors: Paginate<Professor> }) => {
      this.professors = data.professors
      //console.log(data)
      console.log(this.professors.data)
    })

    // get the queryParams
    this._route.queryParams.subscribe((data) => {
      this.queryParams = JSON.parse(JSON.stringify(data))
    })

    // transaltion service
    this._translateService
      .get('content.title.professors')
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

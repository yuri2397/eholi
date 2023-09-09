import { ActivatedRoute, Router } from '@angular/router'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Student } from '../student.model'
import { Param } from 'app/auth/models/data.model'
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service'
import { TranslateService } from '@ngx-translate/core'
import { SelectionType } from '@swimlane/ngx-datatable'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import Swal from 'sweetalert2'
import { StudentService } from '../student.service'
import { first } from 'rxjs/operators'

@Component({
  selector: 'app-student',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StudentListComponent implements OnInit {
  students: Paginate<Student>

  public contentHeader!: any
  public queryParams: Param = {}
  public basicSelectedOption: number = 5
  searchTimeout: NodeJS.Timeout
  public SelectionType = SelectionType
  editingStudent! : Student
  deletedRow!: Student
  
  constructor( 
    private _route: ActivatedRoute,
    private _translateService: TranslateService,
    private _router: Router,
    private _modalService: NgbModal,
    private studentService : StudentService) {}
  
    openCreateModal(modal: any) {
      this._modalService
        .open(modal, {
          centered: true,
          windowClass: 'modal modal-primary',
          size: 'lg',
          keyboard: false,
        })
        .result.then((result) => {
          if (result) {
            this.students.data = [result, ...this.students.data]
          }
        })
        .catch((_) => {})
    }

    openEditModal(modal: any, item: Student) {
      this.editingStudent = item
      this._modalService
        .open(modal, {
          centered: true,
          windowClass: 'modal modal-primary',
          size: 'lg',
          keyboard: false,
        })
        .result.then((result) => {
          if (result) {
            this.students.data.splice(
              this.students.data.indexOf(item),
              1,
              result,
            )
            this.students.data = [...this.students.data]
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
    this._route.data.subscribe((data: { students: Paginate<Student> }) => {
      this.students = data.students
    })

    // get the queryParams
    this._route.queryParams.subscribe((data) => {
      this.queryParams = JSON.parse(JSON.stringify(data))
    })

    // transaltion service
    this._translateService
      .get('content.title.students')
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

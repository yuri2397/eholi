import { finalize } from 'rxjs/operators'
import { AdmissionRequest, Student, Tutor } from './../student.model'
import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import Stepper from 'bs-stepper'
import { TutorsService } from '../../school/services/tutors.service'
import { ClassLevelService } from '../../establishment/services/class-level.service'
import { ClassLevel } from '../../establishment/models/class-level.model'
import Swal from 'sweetalert2'
import { AdminissionService } from '../services/adminission.service'
import { ToastrService } from 'ngx-toastr'
import { Paginate } from 'app/auth/models/base.model'

@Component({
  selector: 'app-admission',
  templateUrl: './admission.component.html',
  styleUrls: ['./admission.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AdmissionComponent implements OnInit {
  // Translate Object
  translateObject: { title: string; sub_title?: string }[] = []
  public contentHeader: object

  // Request object
  request: AdmissionRequest = new AdmissionRequest()
  tutorTypes: Tutor[] = []

  public student: Student = new Student()

  searchTimeout: NodeJS.Timeout
  classLevelDataSources: Paginate<ClassLevel>
  classLevelSearchLoad: boolean

  constructor(
    private _tutorsService: TutorsService,
    private _classLevelService: ClassLevelService,
    private _admissionService: AdminissionService,
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
  ) {
    // transaltion service
    this._translateService
      .get(['content.title.admission', 'content.admission.stepper'])
      .subscribe((data: string[]) => {
        console.log(data)
        this.translateObject = data['content.admission.stepper']

        this.contentHeader = {
          headerTitle: data['content.title.admission'],
          actionButton: false,
        }
      })
  }

  confirmAdmission(classLeve: ClassLevel) {
    this._translateService
      .get(['content.notifications.confirm.create', 'content.btn'])
      .subscribe({
        next: (data: string[]) => {
          console.log(data)

          let text = data['content.notifications.confirm.create']
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
              this._save()
            }
          })
        },
      })
  }

  _save() {
    console.log(this.request)
    this._admissionService.store(this.request).subscribe({
      next: (data) => {
        console.log(data)
        this._toastrService.success(
          this._translateService.instant('content.notifications.success.title'),
          this._translateService.instant(
            'content.notifications.success.message',
          ),
        )
      },
      error: (error) => {
        this._toastrService.error(
          this._translateService.instant('content.notifications.error.title'),
          this._translateService.instant('content.notifications.error.message'),
        )
      },
    })
  }

  onsearchTutors(item: Tutor, data: string) {
    if (data) clearTimeout(this.searchTimeout)
    data.length >= 9 &&
      (this.searchTimeout = setTimeout(() => {
        item.searched = true
        this._tutorsService
          .index({
            search_query: data,
          })
          .pipe(finalize(() => (item.searched = false)))
          .subscribe({
            next: (response) => {
              console.log(response)
              this.tutorTypes = response.data
              if (response.data.length == 1) {
                item.name = response.data[0].name
                item.reference = response.data[0].reference
                item.adress = response.data[0].adress
                item.phone1 = response.data[0].phone1
                item.type = response.data[0].type
                this.request.tutors = [...this.request.tutors]
              }
            },
          })
      }, 500))
  }

  onsearchClassLevel(data: string) {
    if (data) clearTimeout(this.searchTimeout)
    data.length >= 2 &&
      (this.searchTimeout = setTimeout(() => {
        this.classLevelSearchLoad = true
        this._classLevelService
          .index({
            search_query: data,
            'with[]': ['level', 'school_year'],
          })
          .pipe(finalize(() => (this.classLevelSearchLoad = false)))
          .subscribe({
            next: (response) => {
              console.log(response)
              this.classLevelDataSources = response
            },
          })
      }, 500))
  }

  // private
  private horizontalWizardStepper: Stepper

  /**
   * Horizontal Wizard Stepper Next
   *
   * @param data
   */
  horizontalWizardStepperNext(data) {
    if (data.form.valid === true) {
      console.log(data.form.value)
      this.horizontalWizardStepper.next()
    }
  }
  /**
   * Horizontal Wizard Stepper Previous
   */
  horizontalWizardStepperPrevious() {
    this.horizontalWizardStepper.previous()
  }

  addItem() {
    this.request.tutors.push({
      phone1: '',
      name: '',
      adress: '',
      type: '',
      id: '',
    })
  }

  deleteItem(id) {
    for (let i = 0; i < this.request.tutors.length; i++) {
      if (this.request.tutors.indexOf(this.request.tutors[i]) === id) {
        this.request.tutors.splice(i, 1)
        break
      }
    }
  }

  /**
   * On Submit
   */
  onSubmit() {
    alert('Submitted!!')
    return false
  }

  ngOnInit(): void {
    this.addItem()
    this.horizontalWizardStepper = new Stepper(
      document.querySelector('#stepper1'),
      {},
    )
  }
}

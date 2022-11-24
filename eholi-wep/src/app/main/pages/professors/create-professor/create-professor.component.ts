import { finalize } from 'rxjs/operators'
import { ProfessorsService } from './../professors.service'
import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-create-professor',
  templateUrl: './create-professor.component.html',
  styleUrls: ['./create-professor.component.scss'],
})
export class CreateProfessorComponent implements OnInit {
  validateForm!: FormGroup
  selectLoading = false
  createdLoad = false

  @Input('modal') modal: any
  form: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _professorService: ProfessorsService,
    private _translate: TranslateService,
    private _toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      first_name: new FormControl(null, [
        Validators.required,
        Validators.min(2),
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.min(2),
      ]),
      email: new FormControl(null, []),
      adress: new FormControl(null, [Validators.min(3)]),
      telephone: new FormControl(null, [Validators.min(9)]),
      cni: new FormControl(null, [Validators.min(12), Validators.required]),
      sexe: new FormControl(null, [Validators.required]),
      poste: new FormControl(null, [Validators.required]),
    })
  }

  get fist_name() {
    return this.validateForm.get('first_name')
  }
  get last_name() {
    return this.validateForm.get('last_name')
  }
  get email() {
    return this.validateForm.get('email')
  }
  get adress() {
    return this.validateForm.get('adress')
  }
  get telephone() {
    return this.validateForm.get('telephone')
  }
  get cni() {
    return this.validateForm.get('cni')
  }

  get sexe() {
    return this.validateForm.get('sexe')
  }

  get poste() {
    return this.validateForm.get('poste')
  }

  save(data: any) {
    this.createdLoad = true
    console.log(data)
    this._professorService
      .create(data)
      .pipe(finalize(() => (this.createdLoad = false)))
      .subscribe({
        next: (response) => {
          console.log(response)

          this._toastrService.success(
            this._translate.instant('student.create.message.success'),
            this._translate.instant('content.notifications.title'),
          )
          this.modal.close(response)
        },
        error: (error) => {
          console.log(error)
          this._toastrService.error(
            this._translate.instant('student.create.message.error'),
            this._translate.instant('content.notifications.title'),
          )
        },
      })
  }
}

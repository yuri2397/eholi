import { first, finalize } from 'rxjs/operators'
import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { LevelService } from '../../services/level.service'
import { Level } from '../../establishment.model'
import { ClassLevelService } from '../../services/class-level.service'

@Component({
  selector: 'app-create-class-level',
  templateUrl: './create-class-level.component.html',
  styleUrls: ['./create-class-level.component.scss'],
})
export class CreateClassLevelComponent implements OnInit {
  @Input('modal') modal: any

  form: FormGroup
  selectLoading = false
  createdLoad = false
  levels: Level[]

  constructor(
    private _fb: FormBuilder,
    private _toastrService: ToastrService,
    private _levelService: LevelService,
    private _translateService: TranslateService,
    private _classLevelService: ClassLevelService,
  ) {
    
  }

  ngOnInit(): void {
    this.getLevels()
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      level_id: new FormControl('', [Validators.required]),
    })
  }

  getLevels() {
    this.selectLoading = true
    this._levelService
      .index<any>({
        with: ['cycle'],
      })
      .pipe(
        first(),
        finalize(() => (this.selectLoading = false)),
      )
      .subscribe({
        next: (response: any) => (this.levels = response),
      })
  }

  get name() {
    return this.form.get('name')
  }

  get level_id() {
    return this.form.get('level_id')
  }

  submit(form: any) {
    this.createdLoad = true
    console.log(form)

    this._classLevelService
      .create(form)
      .pipe(
        first(),
        finalize(() => (this.createdLoad = false)),
      )
      .subscribe({
        next: (response) => {
          this._toastrService.success(
            this._translateService.instant(
              'class_level.create.message.success',
            ),
            this._translateService.instant('content.notifications.title'),
          )
          response.level = this.levels.find((l) => l.id === response.level_id)
          this.modal.close(response)
        },
        error: (error) => {
          this._toastrService.error(
            this._translateService.instant('class_level.create.message.error'),
            this._translateService.instant('content.notifications.title'),
          )
        },
      })
  }
}

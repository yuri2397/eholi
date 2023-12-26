import { finalize, first } from 'rxjs/operators'
import { pipe } from 'rxjs'
import { group } from '@angular/animations'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core'
import { BuildingService } from '../../services/building.service'
import { Building } from '../../establishment.model'
import { TranslateService } from '@ngx-translate/core'
import { ClassRoomService } from '../../services/class-room.service'
import { ToastrService } from 'ngx-toastr'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-create-class-room',
  templateUrl: './create-class-room.component.html',
  styleUrls: ['./create-class-room.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateClassRoomComponent implements OnInit {
  @Input('modal') modal: any
  form: FormGroup
  selectLoading = false
  createdLoad = false
  buildings!: Building[]

  constructor(
    private _fb: FormBuilder,
    private _buildingService: BuildingService,
    private _classRoomService: ClassRoomService,
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
    private _modalService: NgbModal,
  ) {
    this.getListOfBuildings()
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.min(0)]),
      building_id: new FormControl('', [Validators.required]),
    })
  }

  get name() {
    return this.form.get('name')
  }

  get size() {
    return this.form.get('size')
  }

  get building_id() {
    return this.form.get('building_id')
  }

  getListOfBuildings() {
    this.selectLoading = true
    this._buildingService
      .index<Building>()
      .pipe(
        first(),
        finalize(() => (this.selectLoading = false)),
      )
      .subscribe({
        next: (response) => {
          console.log(response)
          this.buildings = response.data
        },
        error: (errors) => {
          console.log(errors)
        },
      })
  }

  submit(form: any) {
    this.createdLoad = true
    this._classRoomService
      .create(form)
      .pipe(
        first(),
        finalize(() => (this.createdLoad = false)),
      )
      .subscribe({
        next: (response) => {
          this._translateService
            .get([
              'class_room.create.message.success',
              'content.notifications.title',
            ])
            .subscribe((data: string[]) => {
              this._toastrService.success(
                data['class_room.create.message.success'],
                data['content.notifications.title'],
              )
              response.building = this.buildings.find(
                (building) => building.id === response.building_id,
              )
              this.modal.close(response)
            })
        },
        error: (errors) => {
          console.log(errors)
          this.modal.close(errors)
        },
      })
  }
}

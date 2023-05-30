import { Building } from './../../models/building.model'
import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { finalize, first } from 'rxjs/operators'
import { BuildingService } from '../../services/building.service'
import { LevelService } from '../../services/level.service'
import { RoomService } from '../../services/room.service'
import { Room } from '../../establishment.model'

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.scss'],
})
export class CreateRoomComponent implements OnInit {
  @Input('modal') modal: any
  form: FormGroup
  selectLoading = false
  createdLoad = false
  buildings: any

  constructor(
    private _fb: FormBuilder,
    private _toastrService: ToastrService,
    private _roomService: RoomService,
    private _translateService: TranslateService,
    private _buildingService: BuildingService,
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      label: new FormControl('', [Validators.required]),
      size: new FormControl('', [Validators.required]),
      building_id: new FormControl('', [Validators.required]),
    })
    this.getBuildings()
  }

  get label() {
    return this.form.get('label')
  }

  get size() {
    return this.form.get('size')
  }

  get building_id() {
    return this.form.get('building_id')
  }

  getBuildings() {
    this.selectLoading = true
    this._buildingService
      .index()
      .pipe(
        first(),
        finalize(() => (this.selectLoading = false)),
      )
      .subscribe({
        next: (response) => {
          this.buildings = response.data
        },
      })
  }

  submit(form: any) {
    this.createdLoad = true
    this._roomService
      .create<Room>(form)
      .pipe(
        first(),
        finalize(() => (this.createdLoad = false)),
      )
      .subscribe({
        next: (response) => {
          this._toastrService.success(
            this._translateService.instant('room.create.message.success'),
            this._translateService.instant('content.notifications.title'),
          )
          response.building = this.buildings.find(
            (e: Building) => e.id === response.building_id,
          )
          console.log(response)

          this.modal.close(response)
        },
        error: (error) => {
          this._toastrService.error(
            this._translateService.instant('room.create.message.error'),
            this._translateService.instant('content.notifications.title'),
          )
        },
      })
  }
}

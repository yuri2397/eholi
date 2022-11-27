import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { first, finalize } from 'rxjs/operators'
import { Building, Room } from '../../establishment.model'
import { BuildingService } from '../../services/building.service'
import { RoomService } from '../../services/room.service'

@Component({
  selector: 'app-edit-room',
  templateUrl: './edit-room.component.html',
  styleUrls: ['./edit-room.component.scss'],
})
export class EditRoomComponent implements OnInit {
  @Input('modal') modal: any
  @Input('item') item: Room
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
      label: new FormControl(this.item.label, [Validators.required]),
      size: new FormControl(this.item.size, [Validators.required]),
      building_id: new FormControl(this.item.building_id, [
        Validators.required,
      ]),
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
      .update(this.item.id, form)
      .pipe(
        first(),
        finalize(() => (this.createdLoad = false)),
      )
      .subscribe({
        next: (response) => {
          this._toastrService.success(
            this._translateService.instant('room.update.message.success'),
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
            this._translateService.instant('room.update.message.error'),
            this._translateService.instant('content.notifications.title'),
          )
        },
      })
  }
}

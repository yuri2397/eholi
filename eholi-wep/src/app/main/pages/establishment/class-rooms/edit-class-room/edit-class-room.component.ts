import { ClassRoom } from './../../models/class-room.model'
import { Component, Input, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { first, finalize } from 'rxjs/operators'
import { Building } from '../../establishment.model'
import { BuildingService } from '../../services/building.service'
import { ClassRoomService } from '../../services/class-room.service'

@Component({
  selector: 'app-edit-class-room',
  templateUrl: './edit-class-room.component.html',
  styleUrls: ['./edit-class-room.component.scss'],
})
export class EditClassRoomComponent implements OnInit {
  @Input('item') item: ClassRoom
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
      name: new FormControl(this.item.name, [Validators.required]),
      size: new FormControl(this.item.size ?? 0, [Validators.min(0)]),
      status: new FormControl(this.item.status == 'active', [
        Validators.required,
      ]),
      building_id: new FormControl(this.item.building_id, [
        Validators.required,
      ]),
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
      .update(this.item.id, {
        name: this.form.value.name,
        building_id: this.form.value.building_id,
        status: this.form.value.status ? 'active' : 'inactive',
        size: this.form.value.size ?? 0,
      } as any)
      .pipe(
        first(),
        finalize(() => (this.createdLoad = false)),
      )
      .subscribe({
        next: (response) => {
          this._translateService
            .get([
              'class_room.update.message.success',
              'content.notifications.title',
            ])
            .subscribe((data: string[]) => {
              this._toastrService.success(
                data['class_room.update.message.success'],
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

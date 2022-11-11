import { group } from '@angular/animations'
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { Component, Input, OnInit } from '@angular/core'
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service'

@Component({
  selector: 'app-create-class-room',
  templateUrl: './create-class-room.component.html',
  styleUrls: ['./create-class-room.component.scss'],
})
export class CreateClassRoomComponent implements OnInit {
  @Input('modal') modal: any
  form: UntypedFormGroup

  constructor(private _fb: FormBuilder) {}
  submit(form: any) {
    if (form.valid) {
    }
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      name: [null, [Validators.required, Validators.minLength(2)]],
      size: [null, []],
      building_id: [null, [Validators.required]],
    })
  }
}

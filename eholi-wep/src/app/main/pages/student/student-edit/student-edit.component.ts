import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

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

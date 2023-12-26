import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { first, finalize } from 'rxjs/operators';
import { Student } from '../../student.model';
import { StudentService } from '../../student.service';
import { StudentSubscribeService } from 'app/modules/establishment/services/student-subscribes.service';

@Component({
  selector: 'app-new-registration',
  templateUrl: './new-registration.component.html',
  styleUrls: ['./new-registration.component.scss']
})
export class NewRegistrationComponent implements OnInit {

  @Input('student') student : Student = new Student();
  validateForm!: FormGroup
  selectLoading = false
  createdLoad = false

  @Input('modal') modal: any
  form: FormGroup

  constructor(
    private _fb: FormBuilder,
    private translateService : TranslateService,
    private toastrService : ToastrService,
    private _subscribeService: StudentSubscribeService
    ) {}

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      class_level_id: new FormControl ('', [Validators.required, Validators.min(2)]),
      student_id: new FormControl (this.student.id),
      amount: new FormControl ('', []),
      type: new FormControl('offline'),
    })
  }
  
  get class_level_id() {
    return this.validateForm.get('class_level_id')
  }
  get student_id() {
    return this.validateForm.get('student_id')
  }
  get amount() {
    return this.validateForm.get('amount')
  }
  get type() {
    return this.validateForm.get('type')
  }

  save(form:any){
    this.createdLoad = true
    // this._subscribeService.create()
  }

}

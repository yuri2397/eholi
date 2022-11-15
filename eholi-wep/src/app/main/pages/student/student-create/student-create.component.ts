import { Component, Input, OnInit } from '@angular/core';
import { group } from '@angular/animations'
import {
  FormBuilder,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms'
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service'
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss']
})
export class StudentCreateComponent implements OnInit {

  student : Student = new Student();
  validateForm!: FormGroup;

  @Input('modal') modal: any
  form: FormGroup

  constructor(
    private _fb: FormBuilder,
    private studentService : StudentService,
    
    ) {}

  ngOnInit(): void {
    this.validateForm = this._fb.group({
      first_name: [null, [Validators.required, Validators.minLength(2)]],
      last_name: [null, [Validators.required, Validators.minLength(2)]],
      email: [null, [Validators.required]],
      adress: [null, [Validators.required, Validators.minLength(2)]],
      telephone: [null, [Validators.required, Validators.minLength(9)]],
      cni: [null, [Validators.required, Validators.minLength(12)]],
      birth_at: [null, [Validators.required]],
      birth_in: [null, [Validators.required]],
      sexe: [null, [Validators.required]],
    })
  }

  submit(form) {
    if (form.valid) {
      console.log('Created...!');
    }
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.controls.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }
  }

  save(){
    console.log(this.form);
    
    this.studentService.create(this.student).subscribe({
      next(resp){
        console.log(resp);
      },
      
      error(err) {
        console.log(err);
        
      },
    })
  }

}

import { Component, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms'
import { Student } from '../student.model';
import { StudentService } from '../student.service';
import { finalize, first } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-student-create',
  templateUrl: './student-create.component.html',
  styleUrls: ['./student-create.component.scss'],
})
export class StudentCreateComponent implements OnInit {

  student : Student = new Student();
  validateForm!: FormGroup
  selectLoading = false
  createdLoad = false

  @Input('modal') modal: any
  form: FormGroup

  constructor(
    private _fb: FormBuilder,
    private studentService : StudentService,
    private translateService : TranslateService,
    private toastrService : ToastrService,
    ) {}

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      first_name: new FormControl ('', [Validators.required, Validators.min(2)]),
      last_name: new FormControl ('', [Validators.required, Validators.min(2)]),
      email: new FormControl ('', []),
      adress: new FormControl('', [Validators.min(2)]),
      telephone: new FormControl ('', [Validators.min(9)]),
      cni: new FormControl ('', [Validators.min(12)]),
      birth_at: new FormControl('', [Validators.required]),
      birth_in: new FormControl ('', [Validators.required]),
      sexe: new FormControl ('', [Validators.required]),
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
  get birth_at() {
    return this.validateForm.get('birth_at')
  }
  get birth_in() {
    return this.validateForm.get('birth_in')
  }
  get sexe() {
    return this.validateForm.get('sexe')
  }

  save(form:any){
    this.createdLoad = true
    this.studentService.create(form).pipe(
      first(),
      finalize(() => (this.createdLoad = false)),
    ).subscribe({
      next:(response)=>{
        this.translateService.get([
          'student.create.message.success',
          'content.notifications.title',
        ]).subscribe((data:string[]) =>{
            this.toastrService.success(
              data['student.create.message.success'],
              data['content.notifications.title'],
            )
            this.modal.close(response)
        })
      },
      error : (errors) =>{
        this.translateService.get([
          'student.create.message.error',
          'content.notifications.title',
        ])
        .subscribe((data:string[]) =>{
          this.toastrService.error(
            data['student.create.message.error'],
            data['content.notifications.title'],
          )
          this.modal.close(errors)
      })
      },
    })
  }
}
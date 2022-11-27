import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { finalize, first } from 'rxjs/operators';
import { Student } from '../student.model';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.scss']
})
export class StudentEditComponent implements OnInit {

  @Input('item') item: Student
  @Input('modal') modal: any
  validateForm: FormGroup
  selectLoading = false
  createdLoad = false

  constructor(
    private _fb: FormBuilder,
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
    private studentService : StudentService,
    private translateService : TranslateService,
    private toastrService : ToastrService) {}

  ngOnInit(): void {
    this.validateForm = new FormGroup({
      first_name: new FormControl (this.item.first_name, [Validators.required, Validators.min(2)]),
      last_name: new FormControl (this.item.last_name, [Validators.required, Validators.min(2)]),
      email: new FormControl (this.item.email, []),
      adress: new FormControl(this.item.adress, [Validators.min(2)]),
      telephone: new FormControl (this.item.telephone, []),
      cni: new FormControl (this.item.cni, []),
      birth_at: new FormControl(this.item.birth_at, [Validators.required]),
      birth_in: new FormControl (this.item.birth_in, [Validators.required]),
      sexe: new FormControl (this.item.sexe, [Validators.required]),
      status: new FormControl(this.item.status == true, [
        Validators.required,
      ]),
    })
  }
  
  get first_name() {
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
  get status() {
    return this.validateForm.get('status')
  }

  save(form : any){
    this.createdLoad = true
    this.studentService.update(
      this.item.id, {
        first_name : this.validateForm.value.first_name,
        last_name : this.validateForm.value.last_name,
        email : this.validateForm.value.email,
        adress : this.validateForm.value.adress,
        telephone : this.validateForm.value.telephone,
        cni : this.validateForm.value.cni,
        birth_at : this.validateForm.value.birth_at,
        birth_in : this.validateForm.value.birth_in,
        sexe : this.validateForm.value.sexe,
        status: this.validateForm.value.status ? true: false,
      } as any).pipe(
      first(),
      finalize(() => (this.createdLoad = false)),
    ).subscribe({
      next:(response)=>{
        this.translateService.get([
          'student.update.message.success',
          'content.notifications.title',
        ]).subscribe((data:string[]) =>{
            this.toastrService.success(
              data['student.update.message.success'],
              data['content.notifications.title'],
            )
            this.modal.close(response)
        })
      },
      error : (errors) =>{
        this.translateService.get([
          'student.update.message.error',
          'content.notifications.title',
        ])
        .subscribe((data:string[]) =>{
          this.toastrService.error(
            data['student.update.message.error'],
            data['content.notifications.title'],
          )
          console.log(errors);
          
          this.modal.close(errors)
      })
      },
    })
  }
}


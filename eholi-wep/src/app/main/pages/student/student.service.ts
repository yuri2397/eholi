import { first } from 'rxjs/operators'
import { Param } from '../../../auth/models/data.model'
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment'
import { Injectable } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Student } from './student.model'
import { AbstractService } from 'app/shared/abstract.service'

@Injectable({
  providedIn: 'root',
})
export class StudentService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('students', _ch)
  }

  // ROUTES URLS AND REQUEST

  public index(params?: Param) {
    return this.http
      .get<Paginate<Student>>(this.enpoint, { params: params })
      .pipe(first())
  }

  public create(student: Student) {
    return this.http.post(this.enpoint + '/store', student)
  }

  public show(uuid: string) {
    return this.http.get<Student>(`${this.enpoint}/show/${uuid}`).pipe(first())
  }

  public ecardIndex(params?: Param) {
    return this.http.get<any>(`${this.enpoint}/ecards`, { params: params })
  }
}

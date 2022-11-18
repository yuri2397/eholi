import { first } from 'rxjs/operators'
import { Param } from '../../../auth/models/data.model'
import { HttpClient } from '@angular/common/http'
import { environment } from 'environments/environment'
import { Injectable } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { SchoolStudent, Student } from './student.model'
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
    return this.http.post(this.enpoint, student)
  }

  public show(uuid: string, params?: Param) {
    return this.http
      .get<Student>(`${this.enpoint}/${uuid}`, { params: params })
      .pipe(first())
  }

  public update(uuid: string, student: Student) {
    return this.http.put<Student>(`${this.enpoint}/${uuid}`, student)
  }

  public ecardIndex(params?: Param) {
    return this.http.get<any>(`${this.enpoint}`, { params: params })
  }

  /**
   *  Disable the student by setting the status to false
   * @param uuid student_id
   * @returns result
   */
  public disableStudentInSchool(uuid: string) {
    return this.http.put<SchoolStudent>(`${this.enpoint}/${uuid}/disable`, {})
  }
}

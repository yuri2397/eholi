import { AdmissionRequest, Student } from './../student.model'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Param } from 'app/auth/models/data.model'
import { AbstractService } from 'app/shared/abstract.service'
import { first } from 'rxjs/operators'
import { Admission } from '../student.model'
import { ApiResponse } from '@core/types'

@Injectable({
  providedIn: 'root',
})
export class AdminissionService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('admissions', _ch)
  }

  // ROUTES URLS AND REQUEST

  public index(params?: Param) {
    return this.http
      .get<Paginate<Admission>>(this.enpoint, { params: params })
      .pipe(first())
  }

  public show(id: string) {
    return this.http.get<Admission>(`${this.enpoint}/${id}`).pipe(first())
  }

  public store(data: AdmissionRequest) {
    return this.http
      .post<ApiResponse<Student>>(this.enpoint, data)
      .pipe(first())
  }
}

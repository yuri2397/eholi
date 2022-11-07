import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Param } from 'app/auth/models/data.model'
import { AbstractService } from 'app/shared/abstract.service'
import { SchoolYear } from '../establishment.model'

@Injectable({
  providedIn: 'root',
})
export class SchoolYearsService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('school-years', _ch)
  }

  // ROUTES URLS AND REQUEST

  index(params?: Param) {
    return this.http.get<Paginate<SchoolYear>>(this.enpoint, {
      params: params,
    })
  }

  create(course: SchoolYear) {
    return this.http.post<SchoolYear>(this.enpoint, course)
  }

  show(uuid: string | number) {
    return this.http.get<SchoolYear>(`${this.enpoint}/${uuid}`)
  }

  delete(uuid: string | number) {
    return this.http.delete<SchoolYear>(`${this.enpoint}/${uuid}`)
  }
}

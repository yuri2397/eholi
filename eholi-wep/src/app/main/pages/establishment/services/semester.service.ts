import { Semester } from './../models/semester.model'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Param } from 'app/auth/models/data.model'
import { AbstractService } from 'app/shared/abstract.service'
import { Building } from '../establishment.model'

@Injectable({
  providedIn: 'root',
})
export class SemesterService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('semesters', _ch)
  }

  // ROUTES URLS AND REQUEST

  index(params?: Param) {
    return this.http.get<Paginate<Semester>>(this.enpoint, {
      params: params,
    })
  }

  create(building: Building) {
    return this.http.post<Semester>(this.enpoint, building)
  }

  show(uuid: string | number) {
    return this.http.get<Semester>(`${this.enpoint}/${uuid}`)
  }

  delete(uuid: string | number) {
    return this.http.delete<Semester>(`${this.enpoint}/${uuid}`)
  }
}

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

  currentSchoolYear(){
    return this._ch.get(`${this.endpoint}/current-school-year`)
  }

}

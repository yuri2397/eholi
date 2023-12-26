import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AbstractService } from 'app/shared/abstract.service'

@Injectable({
  providedIn: 'root',
})
export class SchoolYearsService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('school-years', _ch);
  }

  currentSchoolYear() {
    return this._ch.get(`${this.endpoint}/current-school-year`);
  }

}

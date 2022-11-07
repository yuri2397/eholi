import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Param } from 'app/auth/models/data.model'
import { AbstractService } from 'app/shared/abstract.service'
import { ClassLevel } from '../establishment.model'

@Injectable({
  providedIn: 'root',
})
export class ClassLevelService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('class-levels', _ch)
  }

  // ROUTES URLS AND REQUEST

  index(params?: Param) {
    return this.http.get<Paginate<ClassLevel>>(this.enpoint, {
      params: params,
    })
  }

  create(class_level: ClassLevel) {
    return this.http.post<ClassLevel>(this.enpoint, class_level)
  }

  show(uuid: string | number) {
    return this.http.get<ClassLevel>(`${this.enpoint}/${uuid}`)
  }

  delete(uuid: string | number) {
    return this.http.delete<ClassLevel>(`${this.enpoint}/${uuid}`)
  }
}

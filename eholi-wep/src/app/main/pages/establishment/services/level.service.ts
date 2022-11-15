import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Param } from 'app/auth/models/data.model'
import { AbstractService } from 'app/shared/abstract.service'
import { Level } from '../establishment.model'

@Injectable({
  providedIn: 'root',
})
export class LevelService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('levels', _ch)
  }

  // ROUTES URLS AND REQUEST

  index(params?: Param) {
    return this.http.get<Paginate<Level>>(this.enpoint, {
      params: params,
    })
  }

  create(level: Level) {
    return this.http.post<Level>(this.enpoint, level)
  }

  show(uuid: string | number) {
    return this.http.get<Level>(`${this.enpoint}/${uuid}`)
  }

  delete(uuid: string | number) {
    return this.http.delete<Level>(`${this.enpoint}/${uuid}`)
  }
}

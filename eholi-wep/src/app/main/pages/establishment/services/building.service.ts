import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Param } from 'app/auth/models/data.model'
import { AbstractService } from 'app/shared/abstract.service'
import { Building } from '../establishment.model'

@Injectable({
  providedIn: 'root',
})
export class BuildingService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('buildings', _ch)
  }

  // ROUTES URLS AND REQUEST

  index(params?: Param) {
    return this.http.get<Paginate<Building>>(this.enpoint, {
      params: params,
    })
  }

  create(building: Building) {
    return this.http.post<Building>(this.enpoint, building)
  }

  show(uuid: string | number) {
    return this.http.get<Building>(`${this.enpoint}/${uuid}`)
  }

  delete(uuid: string | number) {
    return this.http.delete<Building>(`${this.enpoint}/${uuid}`)
  }
}

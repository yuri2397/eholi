import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Param } from 'app/auth/models/data.model'
import { AbstractService } from 'app/shared/abstract.service'
import { Room } from '../establishment.model'

@Injectable({
  providedIn: 'root',
})
export class RoomService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('rooms', _ch)
  }

  // ROUTES URLS AND REQUEST

  index(params?: Param) {
    return this.http.get<Paginate<Room>>(this.enpoint, {
      params: params,
    })
  }

  create(housing: Room) {
    return this.http.post<Room>(this.enpoint, housing)
  }

  update(uuid: string | number, housing: Room) {
    return this.http.put<Room>(`${this.enpoint}/${uuid}`, housing)
  }

  show(uuid: string | number) {
    return this.http.get<Room>(`${this.enpoint}/${uuid}`)
  }

  delete(uuid: string | number) {
    return this.http.delete<Room>(`${this.enpoint}/${uuid}`)
  }
}

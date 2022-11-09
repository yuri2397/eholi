import { Paginate } from 'app/auth/models/base.model'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AbstractService } from 'app/shared/abstract.service'
import { ClassRoom } from '../establishment.model'
import { Param } from 'app/auth/models/data.model'

@Injectable({
  providedIn: 'root',
})
export class ClassRoomService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('class-rooms', _ch)
  }

  // ROUTES URLS AND REQUEST

  index(params?: Param) {
    return this.http.get<Paginate<ClassRoom>>(this.enpoint, {
      params: params,
    })
  }

  create(class_room: ClassRoom) {
    return this.http.post<ClassRoom>(this.enpoint, class_room)
  }

  show(uuid: string | number) {
    return this.http.get<ClassRoom>(`${this.enpoint}/${uuid}`)
  }

  delete(uuid: string | number) {
    return this.http.delete<ClassRoom>(`${this.enpoint}/${uuid}`)
  }
}

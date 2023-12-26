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

}

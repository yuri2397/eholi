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
}

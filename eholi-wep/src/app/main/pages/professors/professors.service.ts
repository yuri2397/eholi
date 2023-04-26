import { Professor } from './professor'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Param } from 'app/auth/models/data.model'
import { AbstractService } from 'app/shared/abstract.service'
import { Paginate } from 'app/auth/models/base.model'
import { first } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class ProfessorsService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('professors', _ch)
  }


  attachAvatar(uuid: string, file: File) {
    const formData = new FormData()
    formData.append('avatar', file)
    return this.http.post(`${this.endpoint}/${uuid}/avatar`, formData)
  }
}

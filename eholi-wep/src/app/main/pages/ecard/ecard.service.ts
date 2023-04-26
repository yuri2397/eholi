import { Param } from './../../../auth/models/data.model'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { AbstractService } from 'app/shared/abstract.service'

@Injectable({
  providedIn: 'root',
})
export class EcardService extends AbstractService {
  constructor(private _hc: HttpClient) {
    super('student-subscribes', _hc)
  }

  index(params?: Param) {
    console.log(this.endpoint)

    return this.http.get<any>(this.endpoint, { params: params })
  }
}

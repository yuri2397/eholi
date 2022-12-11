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

  // ROUTES URLS AND REQUEST

  public index(params?: Param) {
    return this.http
      .get<Paginate<Professor>>(this.enpoint, { params: params })
      .pipe(first())
  }

  public create(professor: Professor) {
    return this.http.post(this.enpoint, professor).pipe(first())
  }

  public show(uuid: string, params?: Param) {
    return this.http
      .get<Professor>(`${this.enpoint}/${uuid}`, { params: params })
      .pipe(first())
  }

  public update(uuid: string, professor: Professor) {
    return this.http.put<Professor>(`${this.enpoint}/${uuid}`, professor)
  }

  attachAvatar(uuid: string, file: File) {
    const formData = new FormData()
    formData.append('avatar', file)
    return this.http.post(`${this.enpoint}/${uuid}/avatar`, formData)
  }
}

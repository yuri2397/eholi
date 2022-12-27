import { Tutor } from './../../student/student.model'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Param } from 'app/auth/models/data.model'
import { AbstractService } from 'app/shared/abstract.service'
import { first } from 'rxjs/operators'

@Injectable({
  providedIn: 'root',
})
export class TutorsService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('tutors', _ch)
  }

}

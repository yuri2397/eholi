import { first } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Param } from 'app/auth/models/data.model'
import { AbstractService } from 'app/shared/abstract.service'
import { Course } from '../establishment.model'

@Injectable({
  providedIn: 'root',
})
export class CourseService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('courses', _ch);
  }
}

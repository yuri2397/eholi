import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Paginate } from 'app/auth/models/base.model'
import { Param } from 'app/auth/models/data.model'
import { AbstractService } from 'app/shared/abstract.service'
import { ClassLevel } from '../establishment.model'
import { ClassLevelCourse } from '../models/class-level-course.model'

@Injectable({
  providedIn: 'root',
})
export class ClassLevelCourseService extends AbstractService {
  constructor(private _ch: HttpClient) {
    super('class-level-courses', _ch)
  }

  // ROUTES URLS AND REQUEST

  index(params?: Param) {
    return this.http.get<Paginate<ClassLevelCourse>>(this.enpoint, {
      params: params,
    })
  }

  create(class_level: ClassLevelCourse) {
    return this.http.post<ClassLevelCourse>(this.enpoint, class_level)
  }

  show(uuid: string | number) {
    return this.http.get<ClassLevelCourse>(`${this.enpoint}/${uuid}`)
  }

  update(uuid: string | number, class_level: ClassLevelCourse | any) {
    return this.http.put<ClassLevelCourse>(
      `${this.enpoint}/${uuid}`,
      class_level,
    )
  }

  delete(uuid: string | number) {
    return this.http.delete<ClassLevelCourse>(`${this.enpoint}/${uuid}`)
  }
}

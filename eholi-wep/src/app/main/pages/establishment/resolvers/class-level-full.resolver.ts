import { ClassLevel } from '../models/class-level.model'
import { Paginate } from '../../../../auth/models/base.model'
import { ClassLevelService } from '../services/class-level.service'
import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { ClassLevelCourse } from '../models/class-level-course.model'
import { ClassLevelCourseService } from '../services/class-level-courses.service'

@Injectable({
  providedIn: 'root',
})
export class ClassLevelFullResolver implements Resolve<ClassLevel> {
  constructor(private _service: ClassLevelService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<ClassLevel> {
    return this._service.index() as any
  }
}

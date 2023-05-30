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
export class ClassLevelCourseResolver
  implements Resolve<Paginate<ClassLevelCourse>> {
  constructor(private _classLevelCourseService: ClassLevelCourseService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Paginate<ClassLevelCourse>> {
    return this._classLevelCourseService.index(route.queryParams)
  }
}

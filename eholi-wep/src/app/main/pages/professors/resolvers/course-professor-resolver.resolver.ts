import { Paginate } from 'app/auth/models/base.model'
import { CourseService } from './../../establishment/services/course.service'
import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { Course } from '../../establishment/establishment.model'
import { ClassLevelCourseService } from '../../establishment/services/class-level-courses.service'
import { ClassLevelCourse } from '../../establishment/models/class-level-course.model'

@Injectable({
  providedIn: 'root',
})
export class CourseProfessorResolverResolver
  implements Resolve<Paginate<ClassLevelCourse>> {
  constructor(private _classLevelHasCourse: ClassLevelCourseService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Paginate<ClassLevelCourse>> {
    let uuid = route.params['id']
    return this._classLevelHasCourse.index({
      'filter[professor_id]': uuid,
      'with[]': ['course', 'class_level', 'semester'],
    })
  }
}

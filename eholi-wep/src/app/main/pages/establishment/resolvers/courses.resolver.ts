import { Paginate } from 'app/auth/models/base.model'
import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { Course } from '../establishment.model'
import { CourseService } from '../services/course.service'

@Injectable({
  providedIn: 'root',
})
export class CoursesResolver implements Resolve<Paginate<Course>> {
  constructor(private _courseService: CourseService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Paginate<Course>> {
    console.log(route.queryParams['coursesParams']);
    return this._courseService.index(route.queryParams['coursesParams'])
  }
}

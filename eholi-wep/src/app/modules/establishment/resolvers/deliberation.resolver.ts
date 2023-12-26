import { DeliberationService } from './../services/deliberationservice';
import { ClassLevelService } from './../services/class-level.service';
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
export class DeliberationResolver implements Resolve<Paginate<Course>> {
  constructor(private service: DeliberationService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Paginate<Course>> {
    console.log(route.queryParams['coursesParams']);
    return this.service.index({
      'class_level_id': route.queryParams['class_level_id'],
    })
  }
}

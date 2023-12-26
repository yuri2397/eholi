import { ClassLevelService } from './../services/class-level.service';
import { LevelSemesterService } from '../services/level_semesterservice';
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
export class ClassLevelSemesterResolver implements Resolve<any> {
  constructor(private sevice: ClassLevelService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Paginate<any>> {
    return this.sevice.show(route.queryParams['class_level_id'], {
      'with[]': ['semesters', 'level', 'school_year']
    })
  }
}

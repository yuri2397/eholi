
import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { Observable, of } from 'rxjs'
import { ClassLevelCourse } from '../models/class-level-course.model'
import { ClassLevelCourseService } from '../services/class-level-courses.service'
import {TimesTablesService} from '../services/times_table.service';

@Injectable({
  providedIn: 'root',
})
export class TimesTablesDetailsResolver
  implements Resolve<any> {
  constructor(private _timesTablesService: TimesTablesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> {
    return this._timesTablesService.show(route.params['id'], route.queryParams);
  }
}

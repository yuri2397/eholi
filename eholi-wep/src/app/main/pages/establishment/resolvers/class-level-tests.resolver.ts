import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ClassLevelTestExamService} from '../services/class-level-test-exam.service';
import {TestExam} from '../models/test-exam.model';
import {first, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClassLevelTestsResolver implements Resolve<TestExam[]> {
  constructor(private _testExamService: ClassLevelTestExamService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TestExam[]> {
    return this._testExamService.index({
      class_level_id: route.queryParams.class_level_id,
      'with[]': ['class_level_has_course.professor', 'class_level_has_course.course']
    }).pipe(first()) as Observable<TestExam[]>;
  }
}

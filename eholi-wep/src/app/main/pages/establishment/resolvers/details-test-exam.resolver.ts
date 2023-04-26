import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ClassLevelTestExamService} from '../services/class-level-test-exam.service';
import {TestExam} from '../models/test-exam.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsTestExamResolver implements Resolve<TestExam> {
  constructor(private _testExamService: ClassLevelTestExamService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<TestExam> {
    return this._testExamService.show<TestExam>(route.params.uuid, route.queryParams);
  }
}

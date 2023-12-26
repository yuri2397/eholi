import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ClassLevelTestExamService} from '../services/class-level-test-exam.service';

@Injectable({
  providedIn: 'root'
})
export class ListTestExamsResolver implements Resolve<any> {
  constructor(private _testExamService: ClassLevelTestExamService) {
  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this._testExamService.index<any>(route.queryParams);
  }
}

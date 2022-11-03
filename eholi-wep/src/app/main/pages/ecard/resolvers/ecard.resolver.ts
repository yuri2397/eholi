import { EcardService } from './../ecard.service'
import { StudentService } from '../../student/student.service'
import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { Observable, of } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class EcardResolver implements Resolve<boolean> {
  constructor(private _ecardService: EcardService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    let params = <any>route.queryParamMap.get('params')
    return this._ecardService.index(params)
  }
}

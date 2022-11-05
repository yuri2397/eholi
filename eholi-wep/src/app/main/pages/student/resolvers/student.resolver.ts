import { StudentService } from '../student.service'
import { Injectable } from '@angular/core'
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router'
import { Paginate } from 'app/auth/models/base.model'
import { Observable, of } from 'rxjs'
import { Student } from '../student.model'

@Injectable({
  providedIn: 'root',
})
export class StudentResolver implements Resolve<Paginate<Student>> {
  constructor(private _studentService: StudentService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<Paginate<Student>> {
    return this._studentService.index()
  }
}

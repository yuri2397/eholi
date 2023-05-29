import { Tutor } from './../../student/student.model';
import { Paginate } from 'app/auth/models/base.model';
import { TutorsService } from './../services/tutors.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TutorsResolver implements Resolve<Paginate<Tutor>> {
  constructor(private _tutorService: TutorsService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Paginate<Tutor>> {
    return this._tutorService.index(route.queryParams);
  }
}

import { ClassLevelCourse } from "./../models/class-level-course.model";
import { ClassLevelCourseService } from "./../services/class-level-courses.service";
import { Injectable } from "@angular/core";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from "@angular/router";
import { Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class DetailCourseResolver implements Resolve<ClassLevelCourse> {
  constructor(private _courseService: ClassLevelCourseService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ClassLevelCourse> {
    return this._courseService.show<ClassLevelCourse>(
      route.paramMap.get("uuid"),
      {
        "with[]": [
          "class_level",
          "course",
          "professor",
          "semester",
          "class_level",
        ],
      }
    );
  }
}

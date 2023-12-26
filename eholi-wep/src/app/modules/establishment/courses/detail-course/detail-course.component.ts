import { first, finalize } from "rxjs/operators";
import { ClassLevelCourse } from "./../../models/class-level-course.model";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { CourseService } from "../../services/course.service";
import { ClassLevelService } from "../../services/class-level.service";
import { ClassLevelCourseService } from "../../services/class-level-courses.service";

@Component({
  selector: "app-detail-course",
  templateUrl: "./detail-course.component.html",
  styleUrls: ["./detail-course.component.scss"],
})
export class DetailCourseComponent implements OnInit {
  courseId: string;
  loading: boolean;
  course: ClassLevelCourse;
  constructor(
    private _route: ActivatedRoute,
    private _classLevelCourseService: ClassLevelCourseService

  ) {}

  ngOnInit(): void {
    this._route.data.subscribe((data) => {
      this.course = data.course;
      console.log(data);
    });
  }

  
}

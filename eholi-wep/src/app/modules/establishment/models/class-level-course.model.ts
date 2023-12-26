import { BaseModel } from "app/auth/models/base.model";
import { ClassLevel } from "./class-level.model";
import { Course } from "./course.model";
import { Semester } from "./semester.model";
import { Professor } from "app/main/pages/professors/professor";

export class ClassLevelCourse extends BaseModel {
  name: string;
  max_note: number;
  coef: number;
  semester_id: string;
  course_id: string;
  class_level_id: string;
  class_level: ClassLevel;
  semester: Semester;
  course: Course;
  duty_percent: number;
  exam_percent: number;
  school_id: string;
  professor_id?: string;
  professor?: Professor;
}

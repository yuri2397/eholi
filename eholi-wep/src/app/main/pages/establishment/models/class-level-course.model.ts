import { BaseModel } from 'app/auth/models/base.model'
import { ClassLevel } from './class-level.model'
import { Course } from './course.model'
import { Semester } from './semester.model'

export class ClassLevelCourse extends BaseModel {
  name: string
  max_note: number
  coef: number
  semester_id: number
  course_id: number
  class_level_id: number
  class_level: ClassLevel
  semester: Semester
  course: Course
  response: ClassLevel
}

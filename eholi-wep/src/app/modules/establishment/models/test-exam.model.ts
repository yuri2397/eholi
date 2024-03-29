import { ClassLevel } from "./class-level.model";
import { Semester } from "./semester.model";
import { ClassLevelCourse } from "./class-level-course.model";
import { Level } from "./level.model";
import { SchoolYear } from "./school-year.model";
import { BaseModel } from "app/auth/models/base.model";
import { Professor } from "app/main/pages/professors/professor";

export class TestExam extends BaseModel {
  title: string;
  max_note: number;
  type: "exam" | "duty";
  percent: number;
  date: Date;
  class_level_id: number;
  class_level: ClassLevel;
  school_has_professor_id: number;
  professor: Professor;
  level_has_semester_id: number;
  semester: Semester;
  school_id: number;
    test_results: TestResult[];
  class_level_has_course_id?: number;
  class_level_has_course?: ClassLevelCourse;
}


export class TestResult extends BaseModel{
    note?:                       number;
    status?:                     string;
    explanations?:               string;
    test_id?:                    string;
    class_level_has_student_id?: string;
    test?:                      TestExam;
    class_level_has_student?:   any;
    class_level_has_course: ClassLevelCourse;
    student?:                    LocalStudent;
}

interface LocalStudent {
    id?:                  string;
    first_name?:          string;
    last_name?:           string;
    birth_at?:            Date;
    birth_in?:            string;
    email?:               string;
    telephone?:           string;
    cni?:                 string;
    reference?:           string;
    sexe?:                string;
    adress?:              string;
    status?:              number;
    created_at?:          Date;
    updated_at?:          Date;
    departement?:         null;
    laravel_through_key?: string;
}


export interface ClassLevelSemester {
  id?:             string;
  school_id?:      null;
  name?:           string;
  level_id?:       string;
  school_year_id?: string;
  created_at?:     Date;
  updated_at?:     Date;
  total_students?: number;
  total_courses?:  number;
  semesters?:      Semester[];
  level?:          Level;
  school_year?:    SchoolYear;
}

export interface Deliberation {
  id?:             string;
  school_year_id?: string;
  semester_id?:    string;
  class_level_id?: string;
  created_at?:     Date;
  updated_at?:     Date;
  semester?:       Semester;
  class_level:     ClassLevel;
  status: 'append'|'finish'|'cancel';
  school_year?: SchoolYear;
  deliberation_item_results: any[]
}
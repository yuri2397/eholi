import { BaseModel } from "app/auth/models/base.model";
import { DateTimePickerComponent } from "app/main/forms/form-elements/date-time-picker/date-time-picker.component";
import { ClassLevel } from "app/modules/establishment/establishment.model";

export class Student extends BaseModel {
  reference: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_in: string;
  birth_at: Date;
  telephone: string;
  cni: string;
  adress?: string;
  sexe: string;
  status: true | false;
  departement?: string;
  media?: any[]

  get fullname() {
    return this.first_name + " " + this.last_name;
  }
}

export class SchoolStudent extends BaseModel {
  school_id: string;
  student_id: string;
  status: true | false;
}

export class Admission extends BaseModel {
  class_level_id: string;
  student_id: string;
  class_level: ClassLevel;
}

export class AdmissionRequest {
  student: Student;
  tutors: Tutor[];
  class_level_id: string;

  constructor() {
    this.student = new Student();
    this.tutors = [];
  }
}

export class Tutor extends BaseModel {
  name: string;
  email?: null;
  phone1: string;
  phone2?: string;
  adress?: string;
  reference?: string;
  type: "father" | "mother" | "others" | string;
}

export interface StudentMetaData {
  room: {
    id: string;
    name: string;
  };
  class_levels: {
    id: string;
    name: string;
    level_id: string;
  };
  tutors: {
    id: string;
    name: string;
    phone1: string;
    adress: string;
    type: string;
  }[];
}

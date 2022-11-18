import { BaseModel } from 'app/auth/models/base.model'
import { DateTimePickerComponent } from 'app/main/forms/form-elements/date-time-picker/date-time-picker.component'

export class Student extends BaseModel {
  first_name: string
  last_name: string
  email: string
  birth_in: string
  birth_at: Date
  telephone: string
  cni: string
  adress: string
  sexe: string
  status: true | false
}

export class SchoolStudent extends BaseModel {
  school_id: string
  student_id: string
  status: true | false
}

import { BaseModel } from 'app/auth/models/base.model'

export class Student extends BaseModel {
  first_name: string
  last_name: string
  email?: string
}

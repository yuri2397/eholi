import { BaseModel } from 'app/auth/models/base.model'
export class Course extends BaseModel {
  name: string
  reference: string
  description?: string
}

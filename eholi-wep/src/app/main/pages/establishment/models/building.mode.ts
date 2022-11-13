import { BaseModel } from 'app/auth/models/base.model'
export class Building extends BaseModel {
  name: string
  school_id: number
  school: any
}

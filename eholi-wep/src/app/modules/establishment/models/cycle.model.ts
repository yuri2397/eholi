import { BaseModel } from 'app/auth/models/base.model'
export class Cycle extends BaseModel {
  name: string
  number: number
  order_by: string
}

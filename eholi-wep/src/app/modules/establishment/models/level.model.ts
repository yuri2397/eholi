import { BaseModel } from 'app/auth/models/base.model'
import { Cycle } from './cycle.model'

export class Level extends BaseModel {
  name: string
  number: number
  cycle_id: string
  cycle?: Cycle
}

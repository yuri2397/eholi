import { Building } from './building.model'
import { BaseModel } from 'app/auth/models/base.model'
import { School } from '../establishment.model'
export class Room extends BaseModel {
  label: string
  size: number
  building_id: number
  building: Building
  school_id: number
  school: School
}

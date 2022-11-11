import { BaseModel } from 'app/auth/models/base.model'
import { Building } from '../establishment.model'
export class ClassRoom extends BaseModel {
  name: string
  size: number
  building_id: number
  building: Building
}

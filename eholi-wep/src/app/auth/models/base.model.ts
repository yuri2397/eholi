export abstract class BaseModel {
  id: any

  created_at?: Date
  updated_at?: Date

  loading?: boolean
  created?: boolean
  deleted?: boolean
  updated?: boolean
  searched?: boolean
}
